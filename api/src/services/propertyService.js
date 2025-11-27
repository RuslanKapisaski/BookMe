import Property from "../models/Property.js";

export default {
  create(propertyData, ownerId) {
    return Property.create({ ...propertyData, ownerId });
  },

  getOneById(propertyId) {
    return Property.findById(propertyId).populate([
      "owner",
      "reviews",
      "bookings",
    ]);
  },

  getAll() {
    return Property.find();
  },

  getLatest() {
    return Property.find().sort({ _id: -1 });
  },

  getAllByOwner(ownerId) {
    return Property.find({ owner: ownerId });
  },

  edit(propertyData, propertyId) {
    return Property.findByIdAndUpdate(propertyId, propertyData);
  },

  async remove(userId, propertyId) {
    const property = await Property.findById(propertyId);

    if (!property.owner.equals(userId)) {
      throw new Error("Only property owner can delete own property!");
    }

    return await Property.findByIdAndDelete(propertyId);
  },
};
