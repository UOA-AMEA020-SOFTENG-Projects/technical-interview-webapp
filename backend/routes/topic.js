import express from "express";
import {
  createTopic,
  updateTopic,
  getTopics,
  getProblemsByTopic,
} from "../dao/topicDAO.js";
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
topicRouter.get(
  "/topic/:topicId/content",
  authenticateToken,
  async (req, res, next) => {
    try {
      const topicId = req.params.topicId;

      // Fetch topic from the database by its ID
      const topic = await Topic.findById(topicId, "content");

      if (!topic) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Topic not found" });
      }

      return res.status(StatusCodes.OK).json(topic.content);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
);

/**
 * Add content to existing topic given topic id
 */
topicRouter.post(
  "/topic/:topicId/content",
  authenticateToken,
  async (req, res, next) => {
    try {
      const topicId = req.params.topicId;

      // Validate request body
      if (!req.body.contentText || !req.body.videoUrl) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "ContentText and videoUrl are required" });
      }

      // Fetch topic from the database by its ID
      const topic = await Topic.findById(topicId);

      if (!topic) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Topic not found" });
      }

      // Add new content to the topic
      topic.content.push({
        contentText: req.body.contentText,
        videoUrl: req.body.videoUrl,
      });

      // Save updated topic
      await topic.save();

      return res
        .status(StatusCodes.OK)
        .json({ message: "Content added successfully" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
);

export default topicRouter;
