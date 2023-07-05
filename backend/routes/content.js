import express from "express";
import { Problem } from "../models/problem.js";
import { createContent, updateContent } from "../dao/contentDAO.js";
import { validateContentBody } from "../middleware/keyValidator.js";

const contentRouter = new express.Router();

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
