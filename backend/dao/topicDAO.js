import { Topic } from "../models/topic.js";
import { Content } from "../models/content.js";
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
  return await Topic.find({}).populate('problems');;
};

const getProblemsByTopic = async (topicId) => {
  
  const topic = await Topic.findById(topicId).populate('problems');
  if (!topic) {
    throw new Error('Topic not found');
  }
  return topic;
};

const getContentByTopic = async (topicId) => {
  if (invalidId(topicId)) {
    throw new Error('Invalid ID format');
  }
  const topic = await Topic.findById(topicId).populate('content');
  if (!topic) {
    throw new Error('Topic not found');
  }
  if (!topic.content) {
    throw new Error('No content found for this topic');
  }
  return topic.content;
};

export { createTopic, updateTopic, getTopics, getProblemsByTopic, getContentByTopic };