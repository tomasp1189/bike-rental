import mongoose, { Schema } from 'mongoose';
import notFoundPlugin from '../lib/notFoundPlugin';

/* ReservationSchema will correspond to a collection in your MongoDB database. */
const ReservationSchema = new mongoose.Schema({
  bike: {
    /* The bike being reserved */
    type: Schema.Types.ObjectId,
    ref: 'Bike',
    required: true,
  },
  owner_id: {
    /* The owner of this reservation
     session.user.sub */
    type: String,
    required: true,
  },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  is_cancelled: {
    type: Boolean,
    default: false,
  },
});

ReservationSchema.plugin(notFoundPlugin);

export default mongoose.models.Reservation ||
  mongoose.model('Reservation', ReservationSchema);
// errors are handled in errorHandler middleware. No need for try/catch blocks
