import { getSession } from '@auth0/nextjs-auth0';
import AppError from '../errors/AppError';
import { errorNames, httpStatusCodes } from '../errors/httpStatusCodes';
import { buildDatesQuery } from '../lib/queryHelpers';
import Reservation from './Reservation';

// errors are handled in errorHandler middleware. No need for try/catch blocks

const create = async (req, res) => {
  const { user } = getSession(req);

  const datesQuery = buildDatesQuery(req.query.startDate, req.query.endDate);
  const docs = await Reservation.find({
    $and: [{ bike: req.body?.bike }, datesQuery],
  });

  if (docs.length > 0)
    throw new AppError(
      'Bike is not available for Reservation on chosen dates.',
      errorNames.CONFLICT,
    );

  const reservation = await Reservation.create({
    ...req.body,
    ownerId: user.sub,
  }); /* create a new model in the database */
  res
    .status(httpStatusCodes.CREATED)
    .json({ success: true, data: reservation });
};
const read = async (req, res) => {
  const reservation = await Reservation.findById(req.query.id);

  res.status(httpStatusCodes.OK).json({ success: true, data: reservation });
};
const update = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.query.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(httpStatusCodes.OK).json({ success: true, data: reservation });
};
const deleteReservation = async (req, res) => {
  const deletedReservation = await Reservation.deleteOne({
    _id: req.query.id,
  });
  res
    .status(httpStatusCodes.OK)
    .json({ success: true, data: deletedReservation });
};
const all = async (req, res) => {
  const { user } = getSession(req);
  const cancelledQuery = req.query.cancelled
    ? { isCancelled: req.query.cancelled }
    : {};
  const reservations = await Reservation.find({
    $and: [{ ownerId: user.sub }, cancelledQuery],
  }); /* find all the data in our database */
  return res
    .status(httpStatusCodes.OK)
    .json({ success: true, data: reservations });
};
const cancel = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.query.id,
    { isCancelled: true },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(httpStatusCodes.OK).json({ success: true, data: reservation });
};

export default {
  create,
  read,
  update,
  deleteReservation,
  all,
  cancel,
};
