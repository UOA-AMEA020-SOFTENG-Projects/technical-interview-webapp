import { User } from "../models/user.js";

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

export { createUser, addRecommendedProblem };
