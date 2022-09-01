class HttpException extends Error {
  message
  status
  additionalInfo

  constructor(status = 500, message, additionalInfo = {}) {
    super(message)
    this.message = message
    this.status = status
    this.additionalInfo = additionalInfo
  }
}

export default HttpException