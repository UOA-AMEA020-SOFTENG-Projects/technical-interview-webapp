import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// connect to the MongoDB database
const connectDB = async (dbUrl = process.env.DB_URL) => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};

export default connectDB;
