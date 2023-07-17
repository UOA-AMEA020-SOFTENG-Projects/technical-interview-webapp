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
    .populate("problemsRecommended")
    .exec();

  if (!user) {
    throw new Error("User not found");
  }

  // Exclude problems that the user has already completed
  const recommendedButNotCompleted = user.problemsRecommended.filter(problem => {
    return !user.problemsCompleted.includes(problem._id);
  });

  return recommendedButNotCompleted;
};



export { createUser, addRecommendedProblem, getCompletedProblemsCount, getRecommendedProblems };

