import { Topic } from "../models/topic.js";

const createTopic = async (topicData) => {
  const newTopic = new Topic(topicData);
  return await newTopic.save();
};

const updateTopic = async (id, updatedData) => {
  return await Topic.findByIdAndUpdate(id, updatedData, { new: true });
};

export { createTopic, updateTopic };
