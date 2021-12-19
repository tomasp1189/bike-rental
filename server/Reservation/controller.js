import { getSession } from '@auth0/nextjs-auth0';
import { httpStatusCodes } from '../errors/httpStatusCodes';
import Reservation from './Reservation';

// errors are handled in errorHandler middleware. No need for try/catch blocks

const create = async (req, res) => {
  const { user } = getSession(req);
  const reservation = await Reservation.create({
    ...req.body,
    owner_id: user.sub,
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
  const reservations = await Reservation.find(
    {},
  ); /* find all the data in our database */
  return res
    .status(httpStatusCodes.OK)
    .json({ success: true, data: reservations });
};
const cancel = async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.query.id,
    { is_cancelled: true },
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
