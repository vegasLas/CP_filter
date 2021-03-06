export const getPostsSel = (state) => {
    return state.posts.posts
}
export const getFilterPostsSel = (state) => {
    return state.posts.filterPosts
} 
export const getCurrentPageSel = (state) => {
    return state.posts.currentPage
} 