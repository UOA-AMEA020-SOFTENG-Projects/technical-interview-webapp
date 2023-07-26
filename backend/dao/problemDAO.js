import { Problem } from "../models/problem.js";
import { User } from "../models/user.js";
import { Topic } from "../models/topic.js";
import invalidId from "../util/validator.js";
import mongoose from "mongoose";

const createProblem = async (problemData) => {
  const newProblem = new Problem(problemData);
  return await newProblem.save();
};

const registerProblemToTopic = async (problemId, topicId) => {
  if (invalidId(topicId) || invalidId(problemId)) {
    throw new Error("Id format invalid");
  }
  const topic = await Topic.findById(topicId);
  topic.problems.push(problemId);
  await topic.save();
};

const deleteProblem = async (id) => {
  if (invalidId(id)) {
    throw new Error("Id format invalid");
  }
  return await Problem.findByIdAndDelete(id);
};

const addTestCasesToProblem = async (problemId, testCases) => {
  if (invalidId(problemId)) {
    throw new Error("Id format invalid");
  }
  const problem = await Problem.findById(problemId);
  if (!problem) throw new Error("Problem not found");
  testCases.forEach((testCase) => problem.testCases.push(testCase));
  await problem.save();
  return problem;
};

const getProblem = async (id) => {
  if (invalidId(id)) {
    throw new Error("Id format invalid");
  }
  const problem = await Problem.findById(id);
  if (!problem) throw new Error("Problem not found");
  return problem;
};

const addTestCaseToProblem = async (problemId, testCase) => {
  if (invalidId(problemId)) {
    throw new Error("Id format invalid");
  }
  const problem = await Problem.findById(problemId);
  if (!problem) throw new Error("Problem not found");
  problem.testCases.push(testCase);
  await problem.save();
  return problem;
};

const addBoilerplateToProblem = async (problemId, boilerplate) => {
  if (invalidId(problemId)) {
    throw new Error("Id format invalid");
  }
  const problem = await Problem.findById(problemId);
  if (!problem) throw new Error("Problem not found");
  problem.boilerplateCode.push(boilerplate);
  await problem.save();
  return problem;
};

const getProblemCompletedStatus = async (problemId, userId) => {
  if (invalidId(problemId) || invalidId(userId)) {
    throw new Error("Id format invalid");
  }
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const status = user.problemsCompleted.includes(problemId);
  return { completed: status };
};

const updateProblemCompletionStatus = async (problemId, userId, complete) => {

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const problemExists = user.problemsCompleted.some(
    (id) => id.toString() === problemId // Convert to string
  );

  if (complete && !problemExists) {
    // Add problem to completed problems
    user.problemsCompleted.push(new mongoose.Types.ObjectId(problemId));
  } else if (!complete && problemExists) {
    // Remove problem from completed problems
    user.problemsCompleted = user.problemsCompleted.filter(
      (id) => id.toString() !== problemId // Convert to string
    );
  }

  await user.save();
};

const getProblemDuration = async (problemId) => {
  if (invalidId(problemId)) {
    throw new Error("Id format invalid");
  }

  const problem = await Problem.findById(problemId);

  if (!problem) {
    throw new Error("Problem not found");
  }

  const { difficulty } = problem;

  const duration = timerDurations.find(
    (timer) => timer.difficulty === difficulty
  )?.duration;

  if (!duration) {
    throw new Error("Duration not found");
  }

  return duration;
};

export {
  createProblem,
  deleteProblem,
  registerProblemToTopic,
  addTestCasesToProblem,
  getProblem,
  getProblemCompletedStatus,
  addTestCaseToProblem,
  addBoilerplateToProblem,
  updateProblemCompletionStatus,
  getProblemDuration
};
