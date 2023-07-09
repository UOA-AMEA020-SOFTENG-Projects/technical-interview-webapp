import { Content } from "../models/content.js";
import { Topic } from "../models/topic.js";
import invalidId from "../util/validator.js";

const createContent = async (contentData) => {
  const newContent = new Content(contentData);
  return await newContent.save();
};

const registerContentWithTopic = async (topicId, contentId) => {
  const topic = await Topic.findById(topicId);
  topic.content = contentId;
  await topic.save();
}

const updateContent = async (contentId, updatedData) => {

  if (invalidId(contentId)) {
    throw new Error('Id format invalid');
  }

  // Find the content by its ID and update it
  // The { new: true } option means that the updated document is returned
  const updatedContent = await Content.findByIdAndUpdate(contentId, updatedData, { new: true });
  
  if (!updatedContent) {
    throw new Error('Content not found');
  }

  return updatedContent;
};

export { createContent, updateContent, registerContentWithTopic };