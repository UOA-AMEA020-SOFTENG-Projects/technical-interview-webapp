import express from "express";
import { StatusCodes } from "http-status-codes";
import { authenticateToken } from "../middleware/authenticator.js";
import Problem from "../models/problem.js";
import invalidId from "../util/validator.js";
import mongoose from "mongoose";
import Question from "../models/question.js";
import User from "../models/user.js";
import Topic from "../models/topic.js";
import * as dotenv from "dotenv";
dotenv.config();

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
questionRouter.get('/questions', async (req, res) => {
  try {
    const questionSet = process.env.QUESTION_SET;

    let queryCondition = {};

    if (questionSet === '1') {
      queryCondition = { order: { $gte: 1, $lte: 9 } };
    } else if (questionSet === '2') {
      queryCondition = { order: { $gte: 10 } };
    }

    const questions = await Question.find(queryCondition).sort('order');
    res.status(200).json(questions);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions', error: err });
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

      const responses = req.body.reduce((acc, curr) => {
        acc[curr.questionId] = curr.selectedResponse;
        return acc;
      }, {});

      const allTopics = await Topic.find({});
      const topicIdToLength = allTopics.reduce((acc, curr) => {
        acc[curr._id] = curr.length;
        return acc;
      }, {});

      const recommendedProblems = [];

      const topicIds = {
        '64c0c98875d308de6c332210': '64b0a79871ac5ad2b373f4a5',
        '64c0c98c7e53bf2a6d0d0228': '64b0a79c4808f5b754ca2b19',
        '64c0c9926f37dbfa1d3b8760': '64b0a7a1664e6698b9720575',
        '64c0c99668fe8a132f4d24d5': '64b0a7a4b5130ea9e3664ef0',
        '64c0c99a65d593917b5e8a1e': '64b0a7a84e2fbc9509c28d64',
        '64c0c99d80eeaa627d2bdf81': '64b0a7aea5c3fe2ade14f9c4',
        '64c0c9a030f38f51c4f6820e': '64b0a7b20fe2987f17160099',
        '64c0c9a467be9993ba630b34': '64b0a7b6a28359d1e6367bff'
      };

      const validLengths = responses['64c0c98571ec7fd03e996e7d'] === 'Less than 1 week' 
        ? ['short'] 
        : responses['64c0c98571ec7fd03e996e7d'] === '1-4 weeks' 
          ? ['short', 'medium'] 
          : ['short', 'medium', 'long'];

      for (const questionId in topicIds) {
        const topicId = topicIds[questionId];
        const difficulty = responses[questionId] === '6' || responses[questionId] === '40' || responses[questionId] === '-1' || responses[questionId] === 'Count of nodes in the linked list' || responses[questionId] === 'Maximum depth or height of the binary tree' || responses[questionId] === 'It checks if every parent node is smaller than or equal to its child/children in the tree, returning true if so, and false otherwise' || responses[questionId] === 'It performs a Depth-First Search (DFS) from the vertex \'v\'' || responses[questionId] === 'Sum of integers from 1 to n' ? 'hard' : 'easy';

        if (validLengths.includes(topicIdToLength[topicId])) {
          const problems = await Problem.find({ topic: topicId, difficulty });
          recommendedProblems.push(...problems.map(p => p._id));
        }
      }

      user.problemsRecommended = recommendedProblems;
      await user.save();

      res
        .status(200)
        .json({
          message: "Answers submitted successfully and problem recommended.",
        });
    } catch (error) {
      console.log(error);
      console.log(error.message);
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
