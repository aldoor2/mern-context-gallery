import express from 'express'
import morgan from 'morgan'

import postsRoutes from './posts/posts.routes.js';
import handleErrors from './app/handleErrors.middleware.js'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/posts', postsRoutes)
app.use(handleErrors.notFound)
app.use(handleErrors.handleErrors)

export default app