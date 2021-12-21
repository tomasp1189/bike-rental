/**
 * Assumptions:
 * - User can only review a bike once.
 * - User must have a reservation that has not been cancelled
 * - User must have a successful reservation, meaning that it was
 * not cancelled and that the "To" date is smaller than the current date
 */

import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import controller from '../../../../server/Bike/controller';
import errorHandler from '../../../../server/errors/errorHandler';
import { httpStatusCodes } from '../../../../server/errors/httpStatusCodes';
import dbConnect from '../../../../server/lib/dbConnect';
import canReview from '../../../../server/lib/middleware/canReview';

export default errorHandler(
  withApiAuthRequired(async (req, res) => {
    // export default async (req, res) => {s
    await dbConnect();

    const { method } = req;
    switch (method) {
      case 'PUT':
        return canReview(controller.review)(req, res);
      default:
        return res
          .status(httpStatusCodes.BAD_REQUEST)
          .json({ success: false, message: 'Bad Request' });
    }
  }),
);
