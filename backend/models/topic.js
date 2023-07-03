import mongoose from "mongoose";
import Schema from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true, 
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: "Content",
    },
    problems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    length: {
      type: String,
      enum: ["short", "medium", "long"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
  },
  {
    timestamps: {},
  }
);

export const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
