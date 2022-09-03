import axios from 'axios'

export const getPostsRequest = async () => await axios.get('http://localhost:4000/api/posts')

export const createPostRequest = async (post) => await axios.post('http://localhost:4000/api/posts', post)

export const deletePostRequest = async (postId) => await axios.delete('http://localhost:4000/api/posts/' + postId)

export const getPostRequest = async (postId) => await axios.get('http://localhost:4000/api/posts/' + postId)