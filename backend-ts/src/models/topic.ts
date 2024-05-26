import mongoose from "mongoose";
import Schema from "mongoose";

const topicSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  content: { type: Schema.Types.ObjectId, ref: "Content" },
  problems: [{ type: Schema.Types.ObjectId, ref: "Problem" }],
});

export const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
