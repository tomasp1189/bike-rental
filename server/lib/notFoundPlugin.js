export default function notFoundPlugin(schema) {
  schema.post(
    ['findOne', 'findById', 'deleteOne', 'findByIdAndUpdate'],
    function (res, next) {
      console.log('notFoundPlugin', res);
      if (!res) {
        const err = new Error('Not found');
        err.name = 'NotFound';
        return next(err);
      }
      return next();
    },
  );
}
