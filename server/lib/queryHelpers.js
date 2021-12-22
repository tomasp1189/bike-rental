/* eslint-disable indent */
export const dateOverlapQuery = date => ({
  startDate: { $lte: date },
  endDate: { $gte: date },
});

export const buildDatesQuery = (startDate, endDate) => ({
  $or: [
    dateOverlapQuery(startDate),
    dateOverlapQuery(endDate),
    {
      $and: [
        { startDate: { $gte: startDate } },
        { endDate: { $lte: endDate } },
      ],
    },
  ],
});

export const buildLocationQuery = coordinates =>
  !coordinates || coordinates.length < 2
    ? {}
    : {
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [coordinates[0], coordinates[1]],
            },
            $maxDistance: 15000,
          },
        },
      };
