import HttpException from './HttpException.js'

/**
 * Custom error handler to standardize error objects returned
 * to client
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
const handleErrors = (err, req, res, next) => {
  console.error(err.message)

  if (err instanceof HttpException) {
    const { status, message = 'Something went wrong', additionalInfo } = err
    return res.status(status).json({ status: 'Error', message, additionalInfo })
  }

  return res.status(500).json({ status: 'Error', message: 'Oops, something went wrong' })
}

/**
 * Error 404 - Resource Not Found
 * @param req Request
 * @param res Response
 */
const notFound = (req, res) => {
  return res.status(404).send({ status: 'Error', message: 'Resource not found' })
}

export default {
  handleErrors,
  notFound
}