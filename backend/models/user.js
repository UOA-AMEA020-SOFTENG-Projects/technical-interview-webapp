import mongoose from "mongoose";
import Schema from "mongoose";
import SM2 from "../spaced-repetition/SM2.js";

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
      numberOfTestRuns: Number,
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

const sm2HistoryEntrySchema = new mongoose.Schema(
  {
    easeFactor: Number,
    interval: Number,
    repetitions: Number,
    reviewDate: Date,
    recommendedReviewDate: Date,
    qualityOfResponse: Number,
  },
  { _id: false }
);

const sm2Schema = new mongoose.Schema({
  problem: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  history: [sm2HistoryEntrySchema],
  easeFactor: {
    type: Number,
    default: 2.5,
  },
  interval: {
    type: Number,
    default: 1,
  },
  repetitions: {
    type: Number,
    default: 0,
  },
  nextReviewDate: {
    type: Date,
  },
  lastAttemptDate: {
    type: Date,
  },
});

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
    sm2Data: [sm2Schema],
  },

  {
    timestamps: {},
  }
);

userSchema.methods.updateSM2 = function (problemId, qualityOfResponse) {
  const today = new Date();
  let sm2Entry = this.sm2Data.find((entry) => entry.problem.equals(problemId));
  if (!sm2Entry) {
    sm2Entry = this.sm2Data.create({
      problem: problemId,
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      lastAttemptDate: today,
      history: [],
    });
    this.sm2Data.push(sm2Entry);
  } else {
    sm2Entry.history.push({
      easeFactor: sm2Entry.easeFactor,
      interval: sm2Entry.interval,
      repetitions: sm2Entry.repetitions,
      reviewDate: today,
      recommendedReviewDate: sm2Entry.nextReviewDate,
      qualityOfResponse: qualityOfResponse,
    });
  }

  const sm2 = new SM2();
  sm2.easeFactor = sm2Entry.easeFactor;
  sm2.interval = sm2Entry.interval;
  sm2.repetitions = sm2Entry.repetitions;
  sm2.update(qualityOfResponse);

  sm2Entry.easeFactor = sm2.easeFactor;
  sm2Entry.interval = sm2.interval;
  sm2Entry.repetitions = sm2.repetitions;
  sm2Entry.lastAttemptDate = new Date();
  sm2Entry.nextReviewDate = sm2.getNextReviewDate(sm2Entry.lastAttemptDate);

  this.markModified("sm2Data");

  console.log(sm2Entry);
  return sm2Entry.nextReviewDate;
};

export const User = mongoose.model("User", userSchema);

export default User;
