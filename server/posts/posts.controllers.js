
export const getPosts = (req, res, next) => {
  res.json({ status: 'OK', data: [] })
}

export const getPost = (req, res, next) => {
  res.json({ status: 'OK', data: {} })
}

export const createPost = (req, res, next) => {
  res.status(201).json({ status: 'Success', data: {} })
}

export const deletePost = (req, res, next) => {
  res.sendStatus(204)
}

export const updatePost = (req, res, next) => {
  res.json({ status: 'Success', data: {} })
}