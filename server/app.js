import express from 'express'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'

import postsRoutes from './posts/posts.routes.js';
import handleErrors from './app/handleErrors.middleware.js'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './upload',
}))

// Routes
app.use('/api/posts', postsRoutes)
app.use(handleErrors.notFound)
app.use(handleErrors.handleErrors)

export default app