import { model, Schema } from "mongoose";

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Property name is required!"],
      minLength: [3, "Property name should be at least 3 characters long!"],
      maxLength: [20, "Property name should be below 20 characters long!"],
    },
    city: {
      type: String,
      required: [true, "City is required!"],
      minLength: [2, "Name of the city should be at least 2 characters long!"],
      maxLength: [20, "Name of the city should be below 20 characters long!"],
    },
    address: {
      type: String,
      required: [true, "Address is required!"],
      minLength: [2, "Address should be at least 2 characters long!"],
      maxLength: [20, "Address should be below 20 characters long!"],
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required!"],
      min: [0, "Price cannot be negative value!"],
    },
    maxGuests: {
      type: Number,
      required: [true, "Guests capacity is required!"],
      min: [1, "Guests capacity should be at least 1 "],
    },
    description: {
      type: String,
      required: [true, "Short description is required!"],
      minLength: [10, "Enter a valid description!"],
    },
    image: {
      // TODO: make it work with firebase
      type: String,
      required: [true, "Property image is required!"],
      match: [/^https?\:\/\/.+$/],
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
    },
    reviews: [{}],
  },
  { timestamps: true }
);

const Property = model("Property", propertySchema);

export default Property;
