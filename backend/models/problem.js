import mongoose from "mongoose";
import Schema from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true, 
    },
    description: String,
    modelDescription: String,
    hint: String,
    boilerplateCode: [
      {
        language: String,
        boilerplate: String, 
      },
    ],
    testCases: [
      {
        input: String,
        output: String,
      },
    ],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
  },
  {
    timestamps: {},
  }
);

export const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
