import express from "express";
import { createUser } from "../dao/userDAO.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';
import { authenticateToken } from "../middleware/auth.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const userRouter = new express.Router();

userRouter.post("/user", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
});


userRouter.post('/user/register', async (req, res, next) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({ username: req.body.username, hashedPassword: hashedPassword });
      await user.save();
      res.status(201).send();
  } catch (error) {
      if (error.code === 11000) {
          res.status(400).json({ message: "Username already in use" });
      } else {
          next(error);
      }
  }
});

userRouter.post('/user/login', async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
      return res.status(400).send('Cannot find user');
  }
  try {
      if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
          const accessToken = jwt.sign({username: user.username}, SECRET_KEY);
          res.json({ accessToken: accessToken });
      } else {
          res.send('Not Allowed');
      }
  } catch (error) {
      next(error);
  }
});

userRouter.get('/user/profile', authenticateToken, async (req, res, next) => {
try {
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    return res.status(404).send('User not found');
  }
  const { hashedPassword, ...userData } = user._doc;
  res.json(userData);
} catch (error) {
  next(error);
}
});


export default userRouter;
