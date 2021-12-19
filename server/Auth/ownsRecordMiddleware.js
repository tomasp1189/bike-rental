import { getSession } from '@auth0/nextjs-auth0';

import dbConnect from '../../lib/dbConnect';
import { errorNames } from '../errors/httpStatusCodes';
import Reservation from '../Reservation/Reservation';

export default function ownsRecord(handler) {
  return async (req, res) => {
    const { user } = await getSession(req, res);

    await dbConnect();

    const existingRecord = await Reservation.findById(req.query.id);

    if (existingRecord.owner_id !== user.sub) {
      const err = new Error('User does not own this reservation');
      err.name = errorNames.FORBIDDEN;
      throw err;
    }
    console.log('user', user['http://localhost:3000/roles'], user);

    // if (user.roles !== 'Manager') {
    //   return ress
    //     .status(401)
    //     .json('You do not have the permissions to access this feature');
    // }

    return handler(req, res);
  };
}
