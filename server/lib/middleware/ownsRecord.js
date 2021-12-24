import { getSession } from '@auth0/nextjs-auth0';

import AppError from '../../errors/AppError';
import { errorNames } from '../../errors/httpStatusCodes';
import Reservation from '../../Reservation/Reservation';
import dbConnect from '../dbConnect';

export default function ownsRecord(handler) {
  return async (req, res) => {
    const { user } = await getSession(req, res);

    await dbConnect();

    const existingRecord = await Reservation.findById(req.query.id);

    if (existingRecord.ownerId !== user.sub)
      throw new AppError(
        'User does not own this reservation',
        errorNames.FORBIDDEN,
      );

    return handler(req, res);
  };
}
