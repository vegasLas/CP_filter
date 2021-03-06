import { PostsAPI } from "../api/PostsAPI"


const SET_POSTS = "SET__POSTS"
const SET_QUEUE = "SET_QUEUE"
const SET_FILTER = "SET_FILTER"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const initialState = {
    posts: [],
    filterPosts: [],
    currentPage: 1,
}
function flatArray(arr) {
    var result = []
    arr.forEach(el => {
        if (Array.isArray(el)) {
            result = [...result, ...flatArray(el)]
        } else {
            result = [...result, el]
        }
    })
    return result
}
function distributorObjectsInArray(arr) {
    let result = []
    let count = 1
    for (var i = 0; i < arr.length; i++) {
        if (!(i % 20)) {
            if (i !== 0) {
                count++
            }
            result[count] = []
        }
        result[count].push(arr[i])
    }
    return result
}
function sortMultiRaising(a, b) {
    return ((a.title.length < b.title.length) ? -1 : ((a.title.length < b.title.length) ? 1 : 0));
}
function sortMultiDecrease(a, b) {
    return ((a.title.length > b.title.length) ? -1 : ((a.title.length < b.title.length) ? 1 : 0));
}
const postsReducer = (state = initialState, action) => {
    let copyArray = [...state.posts];
    switch (action.type) {
        case SET_POSTS: {
            let array = action.posts
            return {
                ...state,
                posts: distributorObjectsInArray(array)
            }
        }
        case SET_QUEUE: {
            copyArray = flatArray(state.posts)

            if (action.state) {
                copyArray.sort(sortMultiRaising)
            }
            else {
                copyArray.sort(sortMultiDecrease)
            }
            return {
                ...state,
                posts: distributorObjectsInArray(copyArray)
            }
        }
        case SET_FILTER: {
            let string = action.string
            copyArray = flatArray(state.posts)
            copyArray = copyArray.filter(o => o.title.match(string))
            return {
                ...state,
                filterPosts: distributorObjectsInArray(copyArray)
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        default:
            return state
    }
}

export const actions = {
    setPosts: (posts) => ({
        type: SET_POSTS,
        posts
    }),
    setQueue: (state) => ({
        type: SET_QUEUE,
        state
    }),
    setFilter: (string) => ({
        type: SET_FILTER,
        string
    }),
    setCurrentPage: (currentPage) => ({
        type: SET_CURRENT_PAGE,
        currentPage
    })
}
export const getPosts = () => async (dispatch) => {
    const posts = await PostsAPI.getPosts()
    dispatch(actions.setPosts(posts))
}
export default postsReducer