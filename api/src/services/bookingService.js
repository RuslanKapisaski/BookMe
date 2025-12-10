import Booking from "../models/Booking.js";

export default {
  getById(bookingId) {
    return Booking.findById(bookingId).populate([
      "guest",
      "property",
      "dateFrom",
      "dateTo",
      "guestsCount",
    ]);
  },

  getAll() {
    return Booking.find();
  },

  getLatest() {
    return Booking.find().sort({ _id: -1 });
  },

  getAllByUser(userId) {
    return Booking.find({ guest: userId })
      .populate("guest")
      .populate("property");
  },

  create(bookingData) {
    return Booking.create(bookingData);
  },

  edit(bookingId, bookingData) {
    return Booking.findByIdAndUpdate(bookingId, bookingData, {
      new: true,
      runValidators: true,
    });
  },

  async remove(userId, bookingId) {
    const booking = await Booking.findById(bookingId);

    if (!booking.user.equals(userId)) {
      throw new Error("Only creator of the booking can delete this booking!");
    }

    return await Booking.findByIdAndDelete(bookingId);
  },
};
