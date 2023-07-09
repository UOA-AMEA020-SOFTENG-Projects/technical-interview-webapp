import express from "express";
import { createTopic, updateTopic, getTopics, getProblemsByTopic, getContentByTopic } from "../dao/topicDAO.js";

import { validateTopicBody } from "../middleware/keyValidator.js";
import { authenticateToken } from "../middleware/authenticator.js";
import Topic from "../models/topic.js";
import { StatusCodes } from "http-status-codes";

const topicRouter = new express.Router();

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

/**
 * Get content by topic id
 */
topicRouter.get("/topic/:id/content", async (req, res) => {
  try {

    const content = await getContentByTopic(req.params.id);
    if (!content) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "No content found for this topic id" });
      return;
    }
    res.json(content);
  } catch (err) {
    console.log(err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});


export default topicRouter;
