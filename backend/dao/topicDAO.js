import { Topic } from "../models/topic.js";
import mongoose from 'mongoose';
import invalidId from "../util/validator.js";

const createTopic = async (topicData) => {
  const newTopic = new Topic(topicData);
  return await newTopic.save();
};

const updateTopic = async (id, updatedData) => {
  if (!invalidId(id)) {
    throw new Error('Invalid ID format');
  }
  return await Topic.findByIdAndUpdate(id, updatedData, { new: true });
};

const getTopics = async () => {
  return await Topic.find({});
};

const getProblemsByTopic = async (topicId) => {
  if (!invalidId(topicId)) {
    throw new Error('Invalid ID format');
  }
  const topic = await Topic.findById(topicId).populate('problems');
  if (!topic) {
    throw new Error('Topic not found');
  }
  return topic;
};

export { createTopic, updateTopic, getTopics, getProblemsByTopic };
