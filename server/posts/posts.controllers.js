import postsService from "./posts.service.js";
import HttpException from '../app/HttpException.js'

export const getPosts = async (req, res, next) => {
  try {
    const posts = await postsService.getAll()
    return res.json({ status: 'OK', data: posts })
  } catch (error) {
    next(new HttpException(400, error.message))
  }
}

export const getPost = async (req, res, next) => {
  const { id } = req.params
  try {
    const post = await postsService.getOne(id)

    if (!post) return next(new HttpException(404, 'Post not found'))

    return res.json({ status: 'OK', data: post })
  } catch (error) {
    next(new HttpException(400, error.message))
  }
}

export const createPost = async (req, res, next) => {
  const { title, description } = req.body

  try {
    if (!title || title.lenght === 0) {
      return next(new HttpException(400, 'Title is required'))
    }

    if (!description || description.lenght === 0) {
      return next(new HttpException(400, 'Description is required'))
    }

    const postSaved = await postsService.create({ title, description })

    res.status(201).json({ status: 'Success', data: postSaved })
  } catch (error) {
    next(new HttpException(400, error.message))
  }
}

export const deletePost = async (req, res, next) => {
  const { id } = req.params

  try {
    const postDeleted = await postsService.deleteOne(id)

    if (!postDeleted) return next(new HttpException(404, 'Post not found'))

    return res.sendStatus(204)
  } catch (error) {
    next(new HttpException(400, error.message))
  }
}

export const updatePost = async (req, res, next) => {
  const { id } = req.params

  try {
    const postUpdated = await postsService.update(id, req.body)
    return res.json({ status: 'Success', data: postUpdated })
  } catch (error) {
    next(new HttpException(400, error.message))
  }
}