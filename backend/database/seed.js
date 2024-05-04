import mongoose from "mongoose";
import connectDB from "./mongoose.js";
import { seedTopics } from "./topicsSeed.js";
import { seedContents } from "./contentSeed.js";
import { seedProblems } from "./problemSeed.js";
import { seedQuestions } from "./questionSeed.js";

async function seedDatabase() {
  try {
    await connectDB(
      "mongodb+srv://npat566:XjqO97chao4jBZhF@algochamp.0yxylh8.mongodb.net/test"
    );

    console.log("Connected to the seed Database successfully");

    await seedTopics();
    await seedContents();
    await seedProblems();
    await seedQuestions();

    mongoose.connection.close();
    console.log("Data seeding completed");
  } catch (err) {
    console.log("Data seeding failed: ", err);
  }
}

seedDatabase();
