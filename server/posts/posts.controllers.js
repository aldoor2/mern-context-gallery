import fs from 'fs-extra'

import postsService from "./posts.service.js";
import HttpException from '../app/HttpException.js'
import { uploadImage, deleteImage } from "../app/cloudinary.js";

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
  let errors = []
  let image

  try {
    if (!title || title.length === 0) {
      errors.push('Title is required')
    }

    if (!description || description.length === 0) {
      errors.push('Description is required')
    }

    if (errors.length > 0) {
      return next(new HttpException(400, 'Expected a title and a description.', errors))
    }

    if (req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath)
      await fs.remove(req.files.image.tempFilePath)
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      }
    }

    const postSaved = await postsService.create({ title, description, image })

    return res.status(201).json({ status: 'Success', data: postSaved })
  } catch (error) {
    next(new HttpException(400, error.message))
  }
}

export const deletePost = async (req, res, next) => {
  const { id } = req.params

  try {
    const postDeleted = await postsService.deleteOne(id)

    if (!postDeleted) return next(new HttpException(404, 'Post not found'))

    if (postDeleted.image.public_id) await deleteImage(postDeleted.image.public_id)

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