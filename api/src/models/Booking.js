import { model, Schema, Types } from "mongoose";

const bookingSchema = new Schema(
  {
    guest: {
      type: Types.ObjectId,
      ref: "User",
    },
    property: {
      type: Types.ObjectId,
      ref: "Property",
    },
    dateFrom: {
      type: Date,
      required: [true, "Enter start period date!"],
    },
    dateTo: {
      type: Date,
      required: [true, "Enter end period date!"],
      validate: {
        validator: function (value) {
          return value >= this.dateFrom;
        },
        message: "End date must be after start date!",
      },
    },
    guestsCount: {
      type: Number,
      required: [true, "Enter guests count!"],
      min: [0, "Invalid guests count!"],
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);

export default Booking;
