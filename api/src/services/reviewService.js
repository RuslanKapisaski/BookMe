import Review from "../models/Review.js";

export default {
  getById(reviewId) {
    return Review.findById(reviewId).populate([
      "property",
      "user",
      "rating",
      "comment",
      "createdAt",
    ]);
  },

  getAll() {
    return Review.find();
  },

  getLatest() {
    return Review.find().sort({ _id: -1 });
  },

  getAllByUser(userId) {
    return Review.find({ user: userId });
  },

  create(reviewData) {
    return Review.create(reviewData);
  },

  edit(reviewId, reviewData) {
    return Review.findByIdAndUpdate(reviewId, reviewData);
  },

  async remove(userId, reviewId) {
    const review = await Review.findById(reviewId);

    if (!review.user.equals(userId)) {
      throw new Error("Only property owner can delete own property!");
    }

    return await Review.findByIdAndDelete(propertyId);
  },
};
