import express from "express";
import { Topic } from "../models/topic.js";
import { createTopic, updateTopic, getTopics, getProblemsByTopic } from "../dao/topicDAO.js";

const topicRouter = new express.Router();

// middleware to check the topic objects being supplied in the request body
const validateTopicBody = (req, res, next) => {
  // get all the keys of the schema for Topic other than the id and the version fields
  const validKeys = Object.keys(Topic.schema.paths).filter((path) => path !== "_id" && path !== "__v");
  
  const reqKeys = Object.keys(req.body);
  
  // check that all the keys in the req.body are valid and included in the topic schema
  const isValid = reqKeys.every((key) => validKeys.includes(key));
  
  if (isValid) {
    next();
  } else {
    res.status(400).json({ message: 'Invalid keys in request body' });
  }
};

topicRouter.post("/topic", validateTopicBody, async (req, res) => {
  try {
    const newTopic = await createTopic(req.body);
    res.json(newTopic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

topicRouter.put("/topic/:id", validateTopicBody, async (req, res) => {
  try {
    const updatedTopic = await updateTopic(req.params.id, req.body);
    res.json(updatedTopic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

topicRouter.get("/topic", async (req, res) => {
  try {
    const topics = await getTopics();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

topicRouter.get("/topic/:id/problems", async (req, res) => {
  try {
    const problems = await getProblemsByTopic(req.params.id);
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default topicRouter;
