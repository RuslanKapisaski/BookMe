import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/", { dbName: "book-me" });
    console.log("Successfully connected to database!");
  } catch (error) {
    console.error("Cannot connect to database: ", error.message);
  }
};
