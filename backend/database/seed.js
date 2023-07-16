import mongoose from "mongoose";
import connectDB from "./mongoose.js";
import { seedTopics } from "./topicsSeed.js";
import { seedContents } from "./contentSeed.js";
import { seedProblems } from "./problemSeed.js";

async function seedDatabase() {
  try {
    await connectDB(
      "mongodb+srv://root:root1234@algochamp-cluster.npdxemw.mongodb.net/test"
    );
    console.log("Connected to the seed Database successfully");

    await seedTopics();
    await seedContents();
    await seedProblems();

    mongoose.connection.close();
    console.log("Data seeding completed");
  } catch (err) {
    console.log("Data seeding failed: ", err);
  }
}

seedDatabase();
