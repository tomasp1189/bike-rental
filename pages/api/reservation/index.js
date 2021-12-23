import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import reservationController from '../../../server/Reservation/controller';
import errorHandler from '../../../server/errors/errorHandler';
import dbConnect from '../../../server/lib/dbConnect';

export default errorHandler(
  withApiAuthRequired(async (req, res) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case 'GET':
        return reservationController.all(req, res);
      case 'POST':
        return reservationController.create(req, res);
      default:
        return res.status(400).json({ success: false });
    }
  }),
);
