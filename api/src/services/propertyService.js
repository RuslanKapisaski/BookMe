import Property from "../models/Property.js";

export default {
  getOneById(propertyId) {
    return Property.findById(propertyId).populate([
      "owner",
      "reviews",
      "bookings",
    ]);
  },

  async getAll(filter, { page = 1, limit = 6 }) {
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Property.countDocuments(filter),
    ]);

    return {
      properties,
      total,
    };
  },

  getLatest() {
    return Property.find().sort({ _id: -1 }).limit(3);
  },

  getAllByOwner(ownerId) {
    return Property.find({ owner: ownerId });
  },

  create(propertyData) {
    return Property.create(propertyData);
  },

  edit(propertyId, propertyData) {
    return Property.findByIdAndUpdate(propertyId, propertyData, {
      new: true,
      runValidators: true,
    });
  },

  async remove(userId, propertyId) {
    const property = await Property.findById(propertyId);

    if (!property.owner.equals(userId)) {
      throw new Error("Only property owner can delete own property!");
    }

    return await Property.findByIdAndDelete(propertyId);
  },
};
