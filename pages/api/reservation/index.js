import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import dbConnect from '../../../lib/dbConnect';
import isManager from '../../../server/Auth/isManagerMiddleware';
import reservationController from '../../../server/Reservation/controller';
import errorHandler from '../../../server/errors/errorHandler';

export default errorHandler(
  withApiAuthRequired(async (req, res) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case 'GET':
        return reservationController.all(req, res);
      case 'POST':
        return isManager(reservationController.create)(req, res);
      default:
        return res.status(400).json({ success: false });
    }
  }),
);
