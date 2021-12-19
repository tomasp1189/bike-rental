import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import dbConnect from '../../../../lib/dbConnect';
import ownsRecord from '../../../../server/Auth/ownsRecordMiddleware';
import errorHandler from '../../../../server/errors/errorHandler';
import reservationController from '../../../../server/Reservation/controller';

export default errorHandler(
  withApiAuthRequired(async (req, res) => {
    const { method } = req;

    await dbConnect();

    switch (method) {
      case 'PUT':
        return ownsRecord(reservationController.cancel)(req, res);
      default:
        return res.status(400).json({ success: false });
    }
  }),
);
