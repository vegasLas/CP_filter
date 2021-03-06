import {instance} from './API'



export const PostsAPI = {
    getPosts() {
        return instance.get(`posts`).then(res => res.data)
    },
}
