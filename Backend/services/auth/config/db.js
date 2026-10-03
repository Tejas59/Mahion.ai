import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database")
  } catch (error) {
    console.log(`db error ${error}`)
  }
};

export default connectDB;
