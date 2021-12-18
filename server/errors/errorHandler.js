/**
 * Operational Errors
 * - failed to connect to server
 * - failed to resolve hostname
 * - invalid user input
 * - request timeout
 * - server returned a 500 response
 * - socket hang-up
 * - system is out of memory
 *
 * Programmer Errors
 *  - called an asynchronous function without a callback
 *  - did not resolve a promise
 *  - did not catch a rejected promise
 *  - passed a string where an object was expected
 *  - passed an object where a string was expected
 *  - passed incorrect parameters in a function
 */

 function logError (err) {
  console.error(err)
 }
 
 function logErrorMiddleware (err, req, res, next) {
  logError(err)
  next(err)
 }
 
 function returnError (err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message)
 }
 
 function isOperationalError(error) {
  if (error instanceof BaseError) {
  return error.isOperational
  }
  return false
 }
 
 module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError
 }

function errorHandler(err, res) {
  console.log(error);

  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }
  if (err.name === 'NotFound') {
    // jwt authentication error
    return res.status(404).json({ message: err });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

export { errorHandler };
