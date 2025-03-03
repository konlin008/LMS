import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb Connected successfully");
  } catch (error) {
    console.log("Error occur", error);
  }
};

export default connectDb;
