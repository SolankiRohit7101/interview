class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this);
  }
}

export default ErrorHandler;
