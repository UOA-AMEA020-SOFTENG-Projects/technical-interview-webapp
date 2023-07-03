import mongoose from "mongoose";
import Schema from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    primaryDescription: {
        type: String,
        required: true,
    },
    secondaryDescription: String,
    videoURL: String,
    code: String,
  },
  {
    timestamps: {},
  }
);

export const Content = mongoose.model("Content", contentSchema);

export default Content;
