import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionContent: {
    type: String,
    required: true,
  },
  responses: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  order: {
    type: Number,
    required: true,
  },
});

export const Question = mongoose.model("Question", questionSchema);

export default Question;
