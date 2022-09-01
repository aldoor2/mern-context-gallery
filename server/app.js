import express from 'express'

import postsRoutes from './posts/posts.routes.js';

const app = express()

app.use('/api/posts', postsRoutes)

export default app