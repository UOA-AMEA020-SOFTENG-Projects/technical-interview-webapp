import express, { Router, Request, Response } from "express";
import Topic from "../models/topic";

const topicsRouter = Router();

topicsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find();

    if (topics.length == 0) {
      res.status(204).json({ message: "No Topics in the Database" });
    }

    res.status(200).json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default topicsRouter;
