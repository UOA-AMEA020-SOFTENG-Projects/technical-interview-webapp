import express from "express";
import { StatusCodes } from "http-status-codes";
import { createProblem, addBoilerplateToProblem,deleteProblem, addTestCasesToProblem, registerProblemToTopic, getProblem, addTestCaseToProblem } from "../dao/problemDAO.js";

const problemRouter = new express.Router();

problemRouter.post("/problem/:topicId", async (req, res) => {
  try {
    const newProblem = await createProblem(req.body);
    await registerProblemToTopic(newProblem._id, req.params.topicId);
    res.status(StatusCodes.CREATED).json(newProblem);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});

problemRouter.delete("/problem/:id", async (req, res) => {
  try {
    await deleteProblem(req.params.id);
    res.status(StatusCodes.OK).json({ message: "Problem deleted" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});

problemRouter.put("/problem/:id/testCases", async (req, res) => {
  try {
    const updatedProblem = await addTestCasesToProblem(req.params.id, req.body.testCases);
    res.status(StatusCodes.OK).json(updatedProblem);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});

problemRouter.get("/problem/:id", async (req, res) => {
  try {
    const problem = await getProblem(req.params.id);
    res.status(StatusCodes.OK).json(problem);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});

problemRouter.put("/problem/:id/testCase", async (req, res) => {
  try {
    const updatedProblem = await addTestCaseToProblem(req.params.id, req.body);
    res.status(StatusCodes.OK).json(updatedProblem);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});

problemRouter.put("/problem/:id/boilerplate", async (req, res) => {
  try {
    const updatedProblem = await addBoilerplateToProblem(req.params.id, req.body);
    res.status(StatusCodes.OK).json(updatedProblem);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});

export default problemRouter;
