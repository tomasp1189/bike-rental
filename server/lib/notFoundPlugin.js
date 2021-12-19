import { errorNames } from '../errors/httpStatusCodes';

export default function notFoundPlugin(schema) {
  schema.post(
    ['findOne', 'findById', 'deleteOne', 'findByIdAndUpdate'],
    (res, next) => {
      console.log('notFoundPlugin', res);
      if (!res) {
        const err = new Error('Not found');
        err.name = errorNames.NOT_FOUND;
        return next(err);
      }
      return next();
    },
  );
}
