import express from "express";
import {
  createTopic,
  updateTopic,
  getTopics,
  getProblemsByTopic,
  getContentByTopic,
} from "../dao/topicDAO.js";

import { validateTopicBody } from "../middleware/keyValidator.js";
import { authenticateToken } from "../middleware/authenticator.js";
import Topic from "../models/topic.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import Problem from "../models/problem.js";

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
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No content found for this topic id" });
      return;
    }
    res.json(content);
  } catch (err) {
    console.log(err.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

/**
 * Get progress by topic id
 */
topicRouter.get(
  "/topic/:topicId/progress",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { topicId } = req.params;

      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }

      // Fetch the user's problems completed for the provided topic id.
      const problemsCompleted = await Problem.find({
        _id: { $in: user.problemsCompleted },
        topic: topicId,
      });

      // Get the IDs of the problems completed
      const problemsCompletedIds = problemsCompleted.map((problem) =>
        problem._id.toString()
      );

      // Fetch the topic
      const topic = await Topic.findById(topicId);

      // If the topic is not found, return an error
      if (!topic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      // Fetch all problems associated with the provided topic id.
      const topicProblems = await Problem.find({
        topic: topicId,
      });

      // Get the IDs of the topic problems
      const topicProblemIds = topicProblems.map((problem) =>
        problem._id.toString()
      );

      // Calculate the progress as a percentage (integer)
      const progress =
        problemsCompleted.length > 0
          ? Math.round((problemsCompleted.length / topicProblems.length) * 100)
          : 0;

      return res.status(200).json({
        problemsCompleted: problemsCompletedIds,
        topicProblems: topicProblemIds,
        progress,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default topicRouter;
