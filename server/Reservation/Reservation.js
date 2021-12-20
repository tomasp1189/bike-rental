import mongoose, { Schema } from 'mongoose';
import AppError from '../errors/AppError';
import { errorNames } from '../errors/httpStatusCodes';
import notFoundPlugin from '../lib/notFoundPlugin';

/* ReservationSchema will correspond to a collection in your MongoDB database. */
const ReservationSchema = new mongoose.Schema({
  bike: {
    /* The bike being reserved */
    type: Schema.Types.ObjectId,
    ref: 'Bike',
    required: true,
  },
  ownerId: {
    /* The owner of this reservation
     session.user.sub */
    type: String,
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isCancelled: {
    type: Boolean,
    default: false,
  },
});

ReservationSchema.plugin(notFoundPlugin);
ReservationSchema.pre('validate', function dateValidation(next) {
  // if (err) next(err);
  const start = new Date(this?.startDate);
  const end = new Date(this?.endDate);
  if (start.getTime() > end.getTime())
    next(
      new AppError(
        'End Date must be greater than Start Date',
        errorNames.VALIDATION_ERROR,
      ),
    );
  else next();
});

export default mongoose.models.Reservation ||
  mongoose.model('Reservation', ReservationSchema);
// errors are handled in errorHandler middleware. No need for try/catch blocks
