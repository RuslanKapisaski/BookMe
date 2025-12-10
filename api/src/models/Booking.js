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
      min: [1, "Invalid guests count!"],
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
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre("save", async function () {
  const periodInMs = this.dateTo - this.dateFrom;
  const periodInDays = Math.floor(periodInMs / (1000 * 60 * 60 * 24));

  if (periodInDays < 1) {
    throw new Error("Period must be at least 1 day!");
  }

  const property = await this.model("Property").findById(this.property);
  if (!property) {
    throw new Error("Property not found!");
  }

  this.bill = periodInDays * property.pricePerNight;
  this.period = periodInDays;
});

const Booking = model("Booking", bookingSchema);

export default Booking;
