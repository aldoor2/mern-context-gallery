import axios from 'axios'

export const getPostsRequest = async () => await axios.get('http://localhost:4000/api/posts')