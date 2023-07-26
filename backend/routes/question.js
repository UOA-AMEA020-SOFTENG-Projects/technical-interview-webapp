import express from "express";
import { StatusCodes } from "http-status-codes";
import { authenticateToken } from "../middleware/authenticator.js";
import User from "../models/user.js";
import Problem from "../models/problem.js";
import invalidId from "../util/validator.js";
import mongoose from "mongoose";
import Question from "../models/question.js";

const questionRouter = new express.Router();

/**
 * Add question
 */
questionRouter.post("/question", async (req, res) => {
  try {
    const { questionContent, responses, image, order } = req.body;

    if (!questionContent || !responses || order === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newQuestion = new Question({
      questionContent,
      responses,
      image,
      order,
    });

    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ message: "Error adding question", error: err });
  }
});

/**
 * Get questionnaire
 */
questionRouter.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find().sort("order");
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions", error: err });
  }
});

/**
 * Submit answers
 * req.body: array question id and answer 
 */

questionRouter.post(
  "/question/submit-answers",
  authenticateToken,
  async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }
      
      console.log(user);
      console.log(req.body,66);

      res
        .status(200)
        .json({
          message: "Answers submitted successfully and problem recommended.",
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error in submitting answers and recommending problem",
          error: error,
        });
    }
  }
);

export default questionRouter;
