import mongoose from "mongoose";
import Schema from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
        problemsCompleted: [
          {
            type: Schema.Types.ObjectId,
            ref: "Problem",
          },
        ],
        problemsIncorrect: [
          {
            type: Schema.Types.ObjectId,
            ref: "Problem",
          },
        ],
      },
      {
        timestamps: {},
      }
    ],
  },
  {
    timestamps: {},
  }
);

export const User = mongoose.model("User", userSchema);

export default User;
