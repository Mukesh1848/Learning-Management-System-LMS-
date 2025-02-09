import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      "mongoDb connection successful !!",
      connectInstance.connection.host
    );
  } catch (error) {
    console.log("There as an error to connect mongoDb", error);
    process.exit(1);
  }
};
