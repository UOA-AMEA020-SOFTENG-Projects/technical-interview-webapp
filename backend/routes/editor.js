import express from "express";
import axios from "axios";
import { spawn } from "child_process";
import { StatusCodes } from "http-status-codes";
import { Problem } from "../models/problem.js";
import { authenticateToken } from "../middleware/authenticator.js";
import User from "../models/user.js";

const editorRouter = new express.Router();

// endpoint 1: text similarity
editorRouter.put("/editor/similarity/:problemId", async (req, res) => {
  try {
    // Fetch problem from the database by its ID
    const problem = await Problem.findById(req.params.problemId);
    if (!problem) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Problem not found" });
    }

    const answer = req.body;
    const submittedAnswer = answer.answer;
    const modelAnswer = problem.modelDescription; // Get the model answer from the problem instance

    const python = spawn("python", [
      "./sbert/sbert.py",
      "--text1",
      submittedAnswer,
      "--text2",
      modelAnswer,
    ]);

    let dataPromise = new Promise((resolve, reject) => {
      python.stdout.on("data", (data) => {
        console.log(`Similarity Score: ${data}`);
        resolve(data.toString());
      });

      python.stderr.on("data", (data) => {
        console.error(`Error occurred: ${data}`);
        reject(new Error(data.toString()));
      });

      python.on("close", (code) => {
        console.log(`Python script finished with code ${code}`);
        if (code !== 0) {
          reject(new Error(`Python script exited with code ${code}`));
        }
      });
    });

    let similarityScore = await dataPromise;

    return res.status(StatusCodes.OK).json({ similarityScore });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

/*
  Endpoint #2: runs the code submitted by the user in the frontend on the jobe server 
  and returns the output. The endpoint takes the language id as a query param and the code 
  is submitted as part of the request body. 
*/
editorRouter.post(
  "/editor/:problemId/code",
  authenticateToken,
  async (req, res, next) => {
    try {
      const sourcecode = req.body.code;
      const selectedLanguage = req.query.language_id;
      const problemId = req.params.problemId;

      // Fetch problem from the database by its ID
      const problem = await Problem.findById(problemId);
      if (!problem) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Problem not found" });
      }

      // Fetch user and update or add solution to currentSolutions
      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "User not found" });
      }

      // Check if user's currentSolutions contain an object with both problem id and language
      const userSolution = user.currentSolutions.find(
        (solution) =>
          solution.problem.toString() === problemId &&
          solution.language === selectedLanguage
      );

      // If solution exists, update it, otherwise add a new one
      if (userSolution) {
        userSolution.solution = sourcecode;
      } else {
        user.currentSolutions.push({
          problem: problemId,
          language: selectedLanguage,
          solution: sourcecode,
        });
      }

      // Save updated user document
      await user.save();

      console.log("-------------------------------------------");
      console.log("code: " + sourcecode, 67);
      console.log("selected language: " + selectedLanguage, 68);
      console.log("-------------------------------------------");

      let fileName = "";

      switch (selectedLanguage) {
        case "c":
          fileName = "output.c";
          break;
        case "java":
          fileName = "Output.java";
          break;
        case "nodejs":
          fileName = "output.js";
          break;
        case "python3":
          fileName = "output.py";
          break;
        case "cpp":
          fileName = "output.cpp";
          break;
        case "php":
          fileName = "output.php";
          break;
        default:
          throw new Error("Language id is invalid");
      }

      const codeData = {
        run_spec: {
          language_id: selectedLanguage,
          sourcefilename: fileName,
          sourcecode: sourcecode,
        },
      };

      const response = await axios.post(
        "http://localhost:4000/jobe/index.php/restapi/runs",
        codeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ message: "Error with Jobe server connection" });
      }

      if (response.data.outcome !== 15) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: response.data.cmpinfo,
          outcome: response.data.outcome,
        });
      }

      return res.status(StatusCodes.OK).json({ output: response.data.stdout });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
);

/*
  Endpoint #3: fetches the test cases for the problem and runs them against the code and returns 
  the outcome for each test case and whether the code passed each one or not.
*/
editorRouter.post(
  "/editor/:problemId/testCase",
  authenticateToken,
  async (req, res, next) => {
    try {
      const sourcecode = req.body.code;
      const selectedLanguage = req.query.language_id;
      const problemId = req.params.problemId;

      // Fetch problem from the database by its ID
      const problem = await Problem.findById(problemId);
      if (!problem) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "Problem not found" });
      }

      let fileName = "";

      switch (selectedLanguage) {
        case "c":
          fileName = "output.c";
          break;
        case "java":
          fileName = "Output.java";
          break;
        case "nodejs":
          fileName = "output.js";
          break;
        case "python3":
          fileName = "output.py";
          break;
        case "cpp":
          fileName = "output.cpp";
          break;
        case "php":
          fileName = "output.php";
          break;
        default:
          throw new Error("Language id is invalid");
      }

      // Fetch user and update or add solution to currentSolutions
      const user = await User.findOne({ username: req.user.username });
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "User not found" });
      }

      // Check if user's currentSolutions contain an object with both problem id and language
      const userSolution = user.currentSolutions.find(
        (solution) =>
          solution.problem.toString() === problemId &&
          solution.language === selectedLanguage
      );

      // If solution exists, update it, otherwise add a new one
      if (userSolution) {
        userSolution.solution = sourcecode;
      } else {
        user.currentSolutions.push({
          problem: problemId,
          language: selectedLanguage,
          solution: sourcecode,
        });
      }

      // Save updated user document
      await user.save();

      let testResults = [];

      for (let i = 0; i < problem.testCases.length; i++) {
        const testcase = problem.testCases[i];

        const codeData = {
          run_spec: {
            language_id: selectedLanguage,
            sourcefilename: fileName,
            sourcecode: sourcecode,
            input: testcase.input,
          },
        };

        const response = await axios.post(
          "http://localhost:4000/jobe/index.php/restapi/runs",
          codeData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("----------------------------------");
        console.log(response.data);
        console.log("----------------------------------");

        if (response.status !== 200) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({ message: "Error with Jobe server connection" });
        }

        if (response.data.outcome !== 15) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: response.data.cmpinfo,
            outcome: response.data.outcome,
          });
        }

        // Check if the output matches the expected output
        if (response.data.stdout.trim() === testcase.output.trim()) {
          testResults.push({ testcase: i + 1, passed: true });
        } else {
          testResults.push({ testcase: i + 1, passed: false });
        }
      }

      return res.status(StatusCodes.OK).json({ testResults });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: error.message });
    }
  }
);

export default editorRouter;
