import { getSession } from '@auth0/nextjs-auth0';

import AppError from '../../errors/AppError';
import { errorNames } from '../../errors/httpStatusCodes';
import Reservation from '../../Reservation/Reservation';
import dbConnect from '../../../lib/dbConnect';

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

    console.log('user', user['http://localhost:3000/roles'], user);

    // if (user.roles !== 'Manager') {
    //   return ress
    //     .status(401)
    //     .json('You do not have the permissions to access this feature');
    // }

    return handler(req, res);
  };
}
