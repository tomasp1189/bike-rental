import bikeController from '../../../server/Bike/controller';
import errorHandler from '../../../server/errors/errorHandler';

import dbConnect from '../../../server/lib/dbConnect';

export default errorHandler(async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      return bikeController.allModels(req, res);
    default:
      return res.status(400).json({ success: false });
  }
});
