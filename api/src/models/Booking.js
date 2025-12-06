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
    bill: {
      type: Number,
      required: [true, "Bill is required!"],
    },
    period: {
      type: Number,
      required: [true, "Period is required!"],
      min: [1, "Period cannot be less than 1 day!"],
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre("save", function (next) {
  const periodInMillis = this.dateTo - this.dateFrom;
  const periodInDays = Math.floor(periodInMillis / (1000 * 60 * 60 * 24));

  if (periodInDays < 0) {
    return next(new Error("End date must be after start date!"));
  }

  this.model("Property").findById(this.property, (err, property) => {
    if (err || !property) {
      return next(new Error("Property not found or error fetching property!"));
    }
    this.bill = periodInDays * property.pricePerNight;
    this.period = daysDiffTime;
    next();
  });
});

const Booking = model("Booking", bookingSchema);

export default Booking;
