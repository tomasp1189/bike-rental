export const dateOverlapQuery = date => ({
  startDate: { $lte: date },
  endDate: { $gte: date },
});

export const buildDatesQuery = (startDate, endDate) => ({
  $or: [
    dateOverlapQuery(startDate),
    dateOverlapQuery(endDate),
    {
      $and: [{ startDate: { $gte: startDate } }, { endDate: { $lte: endDate } }],
    },
  ],
});
