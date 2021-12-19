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

// function logError(err) {
//   console.error(err);
// }

// function logErrorMiddleware(err, req, res, next) {
//   logError(err);
//   next(err);
// }

// function returnError(err, req, res, next) {
//   res.status(err.statusCode || 500).send(err.message);
// }

// function isOperationalError(error) {
//   if (error instanceof BaseError) {
//     return error.isOperational;
//   }
//   return false;
// }

// module.exports = {
//   logError,
//   logErrorMiddleware,
//   returnError,
//   isOperationalError,
// };

// import nc from 'next-connect';

// const errorHandler = () =>
//   nc({
//     onError: (err, req, res) => {
//       console.error(err.stack);
//       res.status(500).end('Server Error');
//     },
//     onNoMatch: (req, res) => {
//       res.status(404).end('Not found');
//     },
//   });

// export default errorHandler;

export default function errorHandler(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (err) {
      console.error(err.name, err);
      switch (err.name) {
        case 'ValidationError':
          return res.status(400).json({ message: err });
        case 'UnauthorizedError':
          return res.status(401).json({ message: 'Unauthorized request' });
        case 'NotFound':
          return res.status(404).json({ message: err });

        default:
          return res.status(500).json({ message: err.message });
      }
    }
  };
}
