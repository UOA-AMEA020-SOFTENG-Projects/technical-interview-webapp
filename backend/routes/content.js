import express from "express";
import { Content } from "../models/content.js";
import { Problem } from "../models/problem.js";
import { createContent, updateContent } from "../dao/contentDAO.js";

const contentRouter = new express.Router();

const validateContentBody = (req, res, next) => {
  const validKeys = Object.keys(Content.schema.paths).filter((path) => path !== "_id" && path !== "__v");

  const reqKeys = Object.keys(req.body);

  const isValid = reqKeys.every((key) => validKeys.includes(key));

  if (isValid) {
    next();
  } else {
    res.status(400).json({ message: 'Invalid keys in request body' });
  }
};

contentRouter.post("/content/:problemId", validateContentBody, async (req, res) => {
  const problemId = req.params.problemId;
  const problem = await Problem.findById(problemId);
  
  if (!problem) {
    res.status(404).json({ message: "Problem not found" });
    return;
  }
  
  try {
    const newContent = await createContent(req.body);
    problem.content = newContent._id;
    await problem.save();
    res.json(newContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

contentRouter.put("/content/:problemId", validateContentBody, async (req, res) => {
  const problemId = req.params.problemId;
  const problem = await Problem.findById(problemId);

  if (!problem || !problem.content) {
    res.status(404).json({ message: "Content not found for given problem id" });
    return;
  }

  try {
    const updatedContent = await updateContent(problem.content, req.body);
    res.json(updatedContent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default contentRouter;
