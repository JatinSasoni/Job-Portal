import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Failed while connecting to database");
  }
};
export default connectDB;
