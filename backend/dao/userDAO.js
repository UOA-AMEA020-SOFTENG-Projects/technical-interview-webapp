import { User } from "../models/user.js";
import { Problem } from "../models/problem.js";

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const addRecommendedProblem = async (username, problemId) => {
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if the problemId is already in the problemsRecommended array
  if (user.problemsRecommended.includes(problemId)) {
    throw new Error("Problem already in recommended problems");
  }

  user.problemsRecommended.push(problemId);
  await user.save();

  return user;
};

const getCompletedProblemsCount = async (username) => {
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new Error("User not found");
  }

  const totalProblems = await Problem.countDocuments();
  const completedProblems = user.problemsCompleted.length;
  const notCompletedProblems = totalProblems - completedProblems;

  return [
    { name: "Completed", problems: completedProblems },
    { name: "Not Completed", problems: notCompletedProblems },
  ];
};

const getRecommendedProblems = async (username) => {
  const user = await User.findOne({ username: username })
    .populate("sm2Data.problem")
    .populate("problemsCompleted")
    .exec();

  if (!user) {
    throw new Error("User not found");
  }

  const now = new Date();

  const recommendedProblems = user.sm2Data
    .filter((item) => {
      return item.nextReviewDate && item.nextReviewDate <= now;
    })
    .map((item) => ({
      problem: item.problem,
      nextReviewDate: item.nextReviewDate,
    }))
    .sort((a, b) => a.nextReviewDate - b.nextReviewDate);

  return recommendedProblems;
};

export {
  createUser,
  addRecommendedProblem,
  getCompletedProblemsCount,
  getRecommendedProblems,
};
