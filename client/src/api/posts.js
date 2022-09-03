import axios from 'axios'

export const getPostsRequest = async () => await axios.get('http://localhost:4000/api/posts')

export const createPostRequest = async (post) => {
  const form = new FormData()

  Object.keys(post).forEach(key => form.append(key, post[key]));

  return await axios.post('http://localhost:4000/api/posts', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deletePostRequest = async (postId) => await axios.delete(`http://localhost:4000/api/posts/${postId}`)

export const getPostRequest = async (postId) => await axios.get(`http://localhost:4000/api/posts/${postId}`)

export const updatePostRequest = async (postId, newFields) => await axios.patch(`http://localhost:4000/api/posts/${postId}`, newFields)