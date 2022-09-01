import { Router } from 'express'

import { createPost, deletePost, getPost, getPosts, updatePost } from './posts.controllers.js';

const postsRouter = Router()

postsRouter.get('/', getPosts)

postsRouter.get('/:id', getPost)

postsRouter.post('/', createPost)

postsRouter.delete('/:id', deletePost)

postsRouter.patch('/:id', updatePost)

export default postsRouter