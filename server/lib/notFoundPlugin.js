import AppError from '../errors/AppError';
import { errorNames } from '../errors/httpStatusCodes';

export default function notFoundPlugin(schema) {
  schema.post(
    ['findOne', 'findById', 'deleteOne', 'findByIdAndUpdate', 'deleteOne'],
    (res, next) => {
      if (!res) return next(new AppError('Not found', errorNames.NOT_FOUND));

      return next();
    },
  );
}
