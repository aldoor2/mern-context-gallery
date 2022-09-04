import express from 'express'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import postsRoutes from './posts/posts.routes.js';
import handleErrors from './app/handleErrors.middleware.js'

// Initialize
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './upload',
}))

// Static files
app.use(express.static(join(__dirname, '../client/dist')))

// Routes
app.use('/api/posts', postsRoutes)
app.use(handleErrors.notFound)
app.use(handleErrors.handleErrors)

export { app }