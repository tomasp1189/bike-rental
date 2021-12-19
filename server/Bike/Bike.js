import mongoose from 'mongoose';
import notFoundPlugin from '../lib/notFoundPlugin';

const AddressSchema = mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String,
  coords: [Number],
});
const ReviewSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: 100,
    maxlength: 250,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  // since I am using auth0 I will only store userIds
  owner_id: {
    type: String,
    required: true,
  },
});

/* BikeSchema will correspond to a collection in your MongoDB database. */
const BikeSchema = new mongoose.Schema(
  {
    model: {
      /* The name of this pet */

      type: String,
      required: [true, 'Please provide a model for this bike.'],
      maxlength: [20, 'model cannot be more than 60 characters'],
    },
    color: {
      /* The owner of this pet */

      type: String,
      required: [true, "Please provide the bike's color"],
      maxlength: [20, 'Color cannot be more than 60 characters'],
    },
    location: {
      /* The species of your pet */

      type: AddressSchema,
      // required: [true, ''],
      required: false,
    },
    // subdocument
    reviews: {
      /* Pet's age, if applicable */
      type: [ReviewSchema],
    },
    average_rating: {
      type: Number,
      default: 0,
    },
    // latestReviews: { type: [ReviewSchema], default: [] }
  },
  { timestamps: true },
);

BikeSchema.pre(['updateOne', 'findOneAndUpdate'], next => {
  // const docToUpdate = await this.model.findOne(this.getQuery());
  if (!this.reviews || this.reviews.length === 0) next();
  const totalRatings = this.reviews.reduce(
    (accu, review) => accu + review.rate,
    0,
  );
  const averageRating = totalRatings / this.reviews.slength;
  this.average_rating = averageRating;
});
BikeSchema.plugin(notFoundPlugin);

export default mongoose.models.Bike || mongoose.model('Bike', BikeSchema);
