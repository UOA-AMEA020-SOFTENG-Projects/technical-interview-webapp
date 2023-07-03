import express from "express";
import { createProblem, deleteProblem, addTestCaseToProblem, registerProblemToTopic, getProblem } from "../dao/problemDAO.js";

const problemRouter = new express.Router();

problemRouter.post("/problem/:topicId", async (req, res) => {
  try {
    const newProblem = await createProblem(req.body);
    await registerProblemToTopic(newProblem._id, req.params.topicId);
    res.json(newProblem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

problemRouter.delete("/problem/:id", async (req, res) => {
  try {
    await deleteProblem(req.params.id);
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

problemRouter.put("/problem/:id/testCase", async (req, res) => {
  try {
    const updatedProblem = await addTestCaseToProblem(req.params.id, req.body.testCase);
    res.json(updatedProblem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

problemRouter.get("/problem/:id", async (req, res) => {
  try {
    const problem = await getProblem(req.params.id);
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default problemRouter;
