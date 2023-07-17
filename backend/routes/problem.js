import express from "express";
import { StatusCodes } from "http-status-codes";
import {
  createProblem,
  addBoilerplateToProblem,
  deleteProblem,
  addTestCasesToProblem,
  registerProblemToTopic,
  getProblem,
  addTestCaseToProblem,
  getProblemCompletedStatus, 
  updateProblemCompletionStatus
} from "../dao/problemDAO.js";
import { authenticateToken } from "../middleware/authenticator.js";
import User from "../models/user.js";
import Problem from "../models/problem.js";
import invalidId from "../util/validator.js";
import mongoose from "mongoose";

const problemRouter = new express.Router();

problemRouter.post("/problem/:topicId", async (req, res) => {
  try {
    const newProblem = await createProblem(req.body);
    await registerProblemToTopic(newProblem._id, req.params.topicId);
    res.status(StatusCodes.CREATED).json(newProblem);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

problemRouter.delete("/problem/:id", async (req, res) => {
  try {
    await deleteProblem(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Problem deleted" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

problemRouter.put("/problem/:id/testCases", async (req, res) => {
  try {
    const updatedProblem = await addTestCasesToProblem(
      req.params.id,
      req.body.testCases
    );
    res.status(StatusCodes.OK).json(updatedProblem);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

problemRouter.get("/problem/:id", async (req, res) => {
  try {
    const problem = await getProblem(req.params.id);
    res.status(StatusCodes.OK).json(problem);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

problemRouter.put("/problem/:id/testCase", async (req, res) => {
  try {
    const updatedProblem = await addTestCaseToProblem(req.params.id, req.body);
    res.status(StatusCodes.OK).json(updatedProblem);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

problemRouter.put("/problem/:id/boilerplate", async (req, res) => {
  try {
    const updatedProblem = await addBoilerplateToProblem(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.OK).json(updatedProblem);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

problemRouter.get(
  "/problem/:id/codecontent",
  authenticateToken,
  async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.user.username });
      const { id } = req.params;
      const { language } = req.query;

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (invalidId(id)) {
        throw new Error("Problem Id format invalid");
      }

      // Check if user's currentSolutions contain an object with both problem id and language.
      const userSolution = user.currentSolutions.find(
        (solution) =>
          solution.problem.toString() === id && solution.language === language
      );

      if (userSolution) {
        return res.json({ solution: userSolution.solution });
      }

      // If it doesn't contain, find the boilerplate field in the problem model.
      const problem = await Problem.findById(id);

      if (!problem) {
        return res.status(404).json({ message: "Problem not found." });
      }

      const boilerplateCode = problem.boilerplateCode.find(
        (code) => code.language === language
      );

      if (!boilerplateCode) {
        return res.status(404).json({
          message: `Boilerplate code for language ${language} not found.`,
        });
      }

      res.json({ solution: boilerplateCode.boilerplate });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Assign topic to problem
 */
problemRouter.put("/problems/:problemId/topic/:topicId", async (req, res) => {
  const { problemId, topicId } = req.params;

  try {
    // Check if the topicId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).send({ message: "Invalid topic id." });
    }

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).send({ message: "Problem not found." });
    }

    problem.topic = topicId;
    await problem.save();

    res.status(200).send({ message: "Topic updated successfully.", problem });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
});

/**
 * Set/remove problem as completed
 */

problemRouter.put(
  "/problem/:problemId/status",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { problemId } = req.params;
      let { complete } = req.body;
      complete = complete === 'true' || complete === true; // Convert to boolean

      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }

      await updateProblemCompletionStatus(problemId, user._id, complete);

      res
        .status(200)
        .json({ message: "Problem completion status updated successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating problem status", error: err.message });
    }
  }
);

/**
 * Check if the problem has been previously completed by the user
 */
problemRouter.get("/problem/:pid/status", authenticateToken, async (req, res) => {

  try {
    const user = await User.findOne({ username: req.user.username });
    
    if (user == null) {
        return res.status(400).json({ message: "Cannot find user" });
    }

    const status = await getProblemCompletedStatus(req.params.pid, user.id);
    res.status(StatusCodes.OK).json(status);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
});

/**
 * Check if problem is recommended to user
 */
problemRouter.get(
  "/problem/:problemId/recommended",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { problemId } = req.params;

      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }

      const isRecommended = user.problemsRecommended.includes(problemId);

      res.status(200).json({ isRecommended });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error checking recommendation status", error: err });
    }
  }
);

export default problemRouter;
