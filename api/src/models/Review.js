import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    property: {
      type: Types.ObjectId,
      ref: "Property", 
      required: [true, "Property is required!"],
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required!"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required!"],
      min: [1, "Rating should be between 1 and 5!"],
      max: [5, "Rating should be between 1 and 5!"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);

export default Review;
