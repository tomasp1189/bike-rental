/* eslint-disable indent */
import { getSession } from '@auth0/nextjs-auth0';
import { httpStatusCodes } from '../errors/httpStatusCodes';
import Bike from './Bike';
import services from './services';

// errors are handled in errorHandler middleware. No need for try/catch blocks
const create = async (req, res) => {
  const bike = await Bike.create(
    req.body,
  ); /* create a new model in the database */
  res.status(httpStatusCodes.CREATED).json({ success: true, data: bike });
};
const read = async (req, res) => {
  const bike = await Bike.findById(req.query.id);
  // if (!bike) {
  //   return res.status(404).json({ success: false });
  // }
  return res.status(httpStatusCodes.OK).json({ success: true, data: bike });
};
const update = async (req, res) => {
  const bike = await Bike.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
  });
  // if (!bike) {
  //   return res.status(400).json({ success: false });
  // }
  return res.status(httpStatusCodes.OK).json({ success: true, data: bike });
};
const deleteBike = async (req, res) => {
  const deletedBike = await Bike.deleteOne({ _id: req.query.id });
  return res
    .status(httpStatusCodes.OK)
    .json({ success: true, data: deletedBike });
};
const all = async (req, res) => {
  const bikes = services.searchAvailableBikes(
    req.query.startDate,
    req.query.endDate,
    req.query.location,
    req.query.rating,
  );

  return res.status(httpStatusCodes.OK).json({ success: true, data: bikes });
};
const review = async (req, res) => {
  const { user } = getSession(req);

  const bike = await Bike.findByIdAndUpdate(
    req.query.id,
    {
      $push: {
        reviews: {
          ...req.body.review,
          ownerId: user.sub,
        },
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return res.status(httpStatusCodes.OK).json({ success: true, data: bike });
};

export default {
  create,
  read,
  update,
  deleteBike,
  all,
  review,
};
