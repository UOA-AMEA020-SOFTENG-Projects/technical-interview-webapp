import { User } from "../models/user.js";

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

export { createUser };
