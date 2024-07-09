import mongoose from "mongoose";
import Schema from "mongoose";

const problemAttemptSchema = new mongoose.Schema(
  {
    problem: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
    },
    solution: String,
    measuredData: {
      correctness: Boolean,
      timeSpent: Number,
      hintUsage: Boolean,
      codeEfficiency: Number, // Representing Big O notation as a number
    },
    userFeedback: {
      difficulty: {
        type: Number,
        min: 1,
        max: 5,
      },
      confidence: {
        type: Number,
        min: 1,
        max: 5,
      },
      understanding: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    qualityOfResponse: {
      type: Number,
      min: 0,
      max: 5,
    },
    attemptDate: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

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
      },
    ],
    problemsCompleted: [
      {
        type: Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    problemsRecommended: [
      {
        type: Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    problemAttempts: [problemAttemptSchema],
  },

  {
    timestamps: {},
  }
);

export const User = mongoose.model("User", userSchema);

export default User;
