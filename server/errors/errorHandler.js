import { errorNames, httpStatusCodes } from './httpStatusCodes';

export default function errorHandler(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (err) {
      console.error(err.name, err);
      switch (err.name) {
        case errorNames.VALIDATION_ERROR:
        case errorNames.BAD_REQUEST:
          return res.status(httpStatusCodes.BAD_REQUEST).json({ message: err });
        case errorNames.UNAUTHORIZED_ERROR:
          return res
            .status(httpStatusCodes.UNAUTHORIZED)
            .json({ message: err.message || 'Unauthorized request' });
        case errorNames.FORBIDDEN:
          return res
            .status(httpStatusCodes.FORBIDDEN)
            .json({ message: err.message || 'Forbidden request' });
        case errorNames.NOT_FOUND:
          return res.status(httpStatusCodes.NOT_FOUND).json({ message: err });
        case errorNames.INTERNAL_SERVER:
        default:
          return res
            .status(httpStatusCodes.INTERNAL_SERVER)
            .json({ message: err.message });
      }
    }
  };
}
