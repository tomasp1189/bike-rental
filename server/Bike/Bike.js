import mongoose from 'mongoose';
import notFoundPlugin from '../lib/notFoundPlugin';

const AddressSchema = mongoose.Schema({
  city: String,
  street: String,
  houseNumber: String,
  coords: [Number],
});
const ReviewSchema = mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  // since I am using auth0 I will only store userIds
  ownerId: {
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
    averageRating: {
      type: Number,
      default: 0,
    },
    // latestReviews: { type: [ReviewSchema], default: [] }
  },
  { timestamps: true },
);

BikeSchema.pre(
  ['updateOne', 'findOneAndUpdate', 'findByIdAndUpdate'],
  async function updateAverageRating(next) {
    const currentReview = this.getUpdate().$push.reviews;
    const docToUpdate = await this.model.findOne(this.getQuery());
    console.log('updateAverageRating', currentReview);
    // const docToUpdate = await this.model.findOne(this.getQuery());
    if (
      !docToUpdate ||
      !docToUpdate.reviews ||
      docToUpdate.reviews.length === 0
    )
      next();

    const totalRatings =
      docToUpdate.reviews.reduce((accu, review) => accu + review.rate, 0) +
      currentReview.rate;

    // if this si the first review, we make the rate the average rating
    const averageRating = Number.isNaN(docToUpdate?.reviews.length)
      ? currentReview.rate
      : totalRatings / (docToUpdate.reviews.length + 1);

    this.getUpdate().$set.averageRating = averageRating;

    next();
  },
);
BikeSchema.plugin(notFoundPlugin);

export default mongoose.models.Bike || mongoose.model('Bike', BikeSchema);
