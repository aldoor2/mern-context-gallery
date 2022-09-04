import axios from 'axios'

export const getPostsRequest = async () => await axios.get('/api/posts')

export const createPostRequest = async (post) => {
  const form = new FormData()

  Object.keys(post).forEach(key => form.append(key, post[key]));

  return await axios.post('/api/posts', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const deletePostRequest = async (postId) => await axios.delete(`/api/posts/${postId}`)

export const getPostRequest = async (postId) => await axios.get(`/api/posts/${postId}`)

export const updatePostRequest = async (postId, newPostFields) => {
  const form = new FormData()

  Object.keys(newPostFields).forEach(key => form.append(key, newPostFields[key]))

  return await axios.patch(`/api/posts/${postId}`, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}