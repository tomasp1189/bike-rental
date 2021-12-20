import { getSession } from '@auth0/nextjs-auth0';

import Bike from '../../Bike/Bike';
import Reservation from '../../Reservation/Reservation';
import AppError from '../../errors/AppError';
import { errorNames } from '../../errors/httpStatusCodes';
import dbConnect from '../../../lib/dbConnect';

export default function canReview(handler) {
  return async (req, res) => {
    const { user } = await getSession(req, res);
    await dbConnect();

    // check that user has an existing and finished reservation for this bikes
    const existingReservation = await Reservation.find({
      ownerId: user.sub,
    })
      .where('bike')
      .equals(req.query.id)
      .where('is_cancelled')
      .equals(false)
      .where('endDate')
      .lte(new Date().toISOString());

    if (existingReservation?.length === 0)
      throw new AppError(
        'User does has no reservation with this bike',
        errorNames.FORBIDDEN,
      );

    // Check if user has already reviewed this bike.
    const BikeWithExistingReviewForUser = await Bike.find(
      {
        _id: req.query.id,
        'reviews.ownerId': user.sub,
      },
      {
        reviews: { $elemMatch: { ownerId: user.sub } },
      },
    );

    if (
      BikeWithExistingReviewForUser.length > 0 &&
      BikeWithExistingReviewForUser[0].reviews.length > 0
    )
      throw new AppError(
        'User has already added a review for this bike',
        errorNames.FORBIDDEN,
      );

    return handler(req, res);
  };
}
