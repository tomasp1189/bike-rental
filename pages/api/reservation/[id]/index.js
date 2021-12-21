import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import reservationController from '../../../../server/Reservation/controller';
import errorHandler from '../../../../server/errors/errorHandler';
import isManager from '../../../../server/lib/middleware/isManager';
import dbConnect from '../../../../server/lib/dbConnect';

export default errorHandler(
  withApiAuthRequired(async (req, res) => {
    // export default async (req, res) => {s
    await dbConnect();

    const { method } = req;
    switch (method) {
      /* Get a model by its ID */
      case 'GET':
        return reservationController.read(req, res);
      /* Edit a model by its ID */
      case 'PUT':
        return reservationController.update(req, res);
      /* Delete a model by its ID */
      case 'DELETE':
        return isManager(reservationController.deleteReservation)(req, res);

      default:
        return res.status(400).json({ success: false });
    }
  }),
);
