import mongoose from "mongoose";
import Schema from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    progress: [
      {
        topic: {
          type: Schema.Types.ObjectId,
          ref: "Topic",
        },
        percentage: Number,
      },
    ],
    currentSolutions: [
      {
        problem: {
          type: Schema.Types.ObjectId,
          ref: "Problem",
        },
        language: String,
        solution: String,
      }
    ]
  },
  {
    timestamps: {},
  }
);

export const User = mongoose.model("User", userSchema);

export default User;
