import express from "express";
import { Topic } from "../models/topic.js";
import { createContent, updateContent, registerContentWithTopic } from "../dao/contentDAO.js";
import { validateContentBody } from "../middleware/keyValidator.js";

const contentRouter = new express.Router();

contentRouter.post("/content/:topicId", validateContentBody, async (req, res) => {
  const topicId = req.params.topicId;
  const topic = await Topic.findById(topicId);
  
  if (!topic) {
    res.status(404).json({ message: "Topic not found" });
    return;
  }
  
  try {
    const newContent = await createContent(req.body);
    await registerContentWithTopic(topicId, newContent._id);
    
    res.json(newContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

contentRouter.put("/content/:topicId", validateContentBody, async (req, res) => {
  const topicId = req.params.topicId;
  const topic = await Topic.findById(topicId);

  if (!topic || !topic.content) {
    res.status(404).json({ message: "Content not found for given topic" });
    return;
  }

  try {
    const updatedContent = await updateContent(topic.content, req.body);
    res.json(updatedContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default contentRouter;
