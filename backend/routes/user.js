import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  addRecommendedProblem,
  getCompletedProblemsCount,
  getRecommendedProblems,
} from "../dao/userDAO.js";
import { authenticateToken } from "../middleware/authenticator.js";
import User from "../models/user.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const userRouter = new express.Router();

/**
 * POST /user/register
 * Register a new user
 */
userRouter.post("/user/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      hashedPassword: hashedPassword,
    });
    await user.save();

    const accessToken = jwt.sign({ username: user.username }, SECRET_KEY);

    res.status(201).json({
      message: "User successfully registered",
      accessToken: accessToken,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Username already in use" });
    } else {
      next(error);
    }
  }
});

/**
 * POST /user/login
 * Login to existing user
 */
userRouter.post("/user/login", async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
    return res.status(400).json({ message: "Cannot find user" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
      const accessToken = jwt.sign({ username: user.username }, SECRET_KEY);
      res.json({ accessToken: accessToken });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /user/profile
 * Get currently logged in user's profile
 */
userRouter.get("/user/profile", authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    const { hashedPassword, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    next(error);
  }
});

userRouter.post(
  "/user/addSolution",
  authenticateToken,
  async (req, res, next) => {
    const { problem, language, solution } = req.body;

    try {
      // Find the user by username from authenticated user
      const user = await User.findOne({ username: req.user.username });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Push the new solution into the user's currentSolutions array
      user.currentSolutions.push({ problem, language, solution });

      // Save the updated user document
      await user.save();

      return res.json({ message: "Solution added successfully." });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT /user/recommendProblem/:problemId
 * Add a problem to recommended problems for a specific user
 */
userRouter.put(
  "/user/recommendProblem/:problemId",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { problemId } = req.params;

      // Check if problemId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(problemId)) {
        return res.status(400).json({ message: "Invalid problemId" });
      }

      const updatedUser = await addRecommendedProblem(
        req.user.username,
        problemId
      );

      return res.status(200).json({
        message: "Problem successfully added to recommended problems",
      });
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      } else if (error.message === "Problem already in recommended problems") {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }
);

/**
 * GET /user/completed
 * Get the number of problems the user has completed and not completed
 */
userRouter.get("/user/completed", authenticateToken, async (req, res, next) => {
  try {
    const result = await getCompletedProblemsCount(req.user.username);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 * GET /user/recommended-list
 * Get the recommended problems for a specific user
 */
userRouter.get(
  "/user/recommended-list",
  authenticateToken,
  async (req, res, next) => {
    try {
      const recommendedProblems = await getRecommendedProblems(
        req.user.username
      );
      return res.status(200).json(recommendedProblems);
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }
);

userRouter.post(
  "/user/problem-attempt",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { problem, measuredData, userFeedback, qualityOfResponse } =
        req.body;

      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newAttempt = {
        problem,
        measuredData,
        userFeedback,
        qualityOfResponse,
      };

      user.problemAttempts.push(newAttempt);
      await user.save();

      const addedAttempt =
        user.problemAttempts[user.problemAttempts.length - 1];

      res.status(201).json({
        message: "Problem attempt recorded successfully",
        attemptId: addedAttempt._id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

userRouter.patch(
  "/user/problem-attempt/:attemptId",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { attemptId } = req.params;
      const updateData = req.body;
      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const attempt = user.problemAttempts.id(attemptId);
      if (!attempt) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      // Update the attempt with the new data
      Object.assign(attempt, updateData);

      if (updateData.qualityOfResponse !== undefined) {
        const nextReviewDate = user.updateSM2(
          attempt.problem,
          updateData.qualityOfResponse
        );

        await user.save();

        res.json({
          message: "Problem attempt updated successfully",
          nextReviewDate: nextReviewDate,
        });
      } else {
        await user.save();
        res.json({ message: "Problem attempt updated successfully" });
      }
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/user/problem-attempts",
  authenticateToken,
  async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.user.username }).populate(
        "problemAttempts.problem"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user.problemAttempts);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/user/problem-attempt/:attemptId",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { attemptId } = req.params;

      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const attempt = user.problemAttempts.id(attemptId);
      if (!attempt) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      res.json(attempt);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch(
  "/user/weights-bias",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { weights, bias } = req.body;
      const user = await User.findOne({ username: req.user.username });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.weights = weights;

      user.bias = bias;

      await user.save();
      res.json({
        message: "Weights and bias updated successfully",
        weights: user.weights,
        bias: user.bias,
      });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/user/weights-bias",
  authenticateToken,
  async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.user.username });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ weights: user.weights, bias: user.bias });
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
