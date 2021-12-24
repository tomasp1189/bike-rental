import { buildDatesQuery, buildLocationQuery } from '../lib/queryHelpers';
import Reservation from '../Reservation/Reservation';
import Bike from './Bike';

const searchAvailableBikes = async (
  startDate,
  endDate,
  location,
  rating,
  model,
  color,
) => {
  const datesQuery = buildDatesQuery(startDate, endDate);
  const reservations = await Reservation.find(
    {
      $and: [{ cancelled: false }, datesQuery],
    },
    'bike',
  );
  const ids = reservations.map(r => r.bike);

  const coordinates = location
    ?.split(',')
    .map(value => Number.parseFloat(value, 10));
  const locationQuery = buildLocationQuery(coordinates);

  const ratingQuery = rating
    ? { averageRating: { $gte: Number.parseFloat(rating) } }
    : {};

  const modelQuery = model ? { model: { $regex: new RegExp(model, 'i') } } : {};
  const colorQuery = color ? { color: { $regex: new RegExp(color, 'i') } } : {};
  const bikes = await Bike.find({
    $and: [
      { _id: { $nin: ids } },
      locationQuery,
      ratingQuery,
      modelQuery,
      colorQuery,
    ],
  });

  return bikes;
};

export default { searchAvailableBikes };
