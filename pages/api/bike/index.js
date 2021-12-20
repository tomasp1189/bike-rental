import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import dbConnect from '../../../lib/dbConnect';
import bikeController from '../../../server/Bike/controller';
import errorHandler from '../../../server/errors/errorHandler';
import isManager from '../../../server/lib/middleware/isManager';

export default errorHandler(
  withApiAuthRequired(async (req, res) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case 'GET':
        return bikeController.all(req, res);
      case 'POST':
        return isManager(bikeController.create)(req, res);
      default:
        return res.status(400).json({ success: false });
    }
  }),
);
