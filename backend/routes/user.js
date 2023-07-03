import express from "express";
import { createUser } from "../dao/userDAO.js";

const userRouter = new express.Router();

userRouter.post("/user", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default userRouter;
