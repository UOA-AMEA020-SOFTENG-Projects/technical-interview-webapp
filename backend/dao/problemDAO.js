import { Problem } from "../models/problem.js";
import { Topic } from "../models/topic.js";
import invalidId from "../util/validator.js";

const createProblem = async (problemData) => {
  const newProblem = new Problem(problemData);
  return await newProblem.save();
};

const registerProblemToTopic = async (problemId, topicId) => {

  if (invalidId(topicId) || invalidId(problemId)) {
    throw new Error('Id format invalid')
  }

  const topic = await Topic.findById(topicId);
  topic.problems.push(problemId);
  await topic.save();
};

const deleteProblem = async (id) => {

  if (invalidId(id)) {
    throw new Error('Id format invalid')
  }

  return await Problem.findByIdAndDelete(id);
};

const addTestCaseToProblem = async (problemId, testCase) => {

  if (invalidId(id)) {
    throw new Error('Id format invalid')
  }

  const problem = await Problem.findById(problemId);
  if (!problem) throw new Error('Problem not found');
  
  problem.testCases.push(testCase);
  await problem.save();
  
  return problem;
};

export { createProblem, deleteProblem, registerProblemToTopic, addTestCaseToProblem };
