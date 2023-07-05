import express from "express";
import axios from 'axios';
import { spawn } from "child_process";
import { StatusCodes } from "http-status-codes";
import { Problem } from "../models/problem.js";

const editorRouter = new express.Router();

editorRouter.put("/editor/similarity/:problemId", async (req, res) => {
  try {
    // Fetch problem from the database by its ID
    const problem = await Problem.findById(req.params.problemId);
    if (!problem) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Problem not found' });
    }
    
    const answer = req.body;
    const submittedAnswer = answer.answer;
    const modelAnswer = problem.modelDescription;  // Get the model answer from the problem instance

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
editorRouter.post("/editor/code", async (req, res) => {
  try {
    const sourcecode = req.body.code;
    const selectedLanguage = req.query.language_id;
    let fileName = '';

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
        }
      }
    );
    
    console.log("--------------------------------------")
    console.log(response.status, 102); 
    console.log(response.data, 103);
    console.log("--------------------------------------")

    if (response.status !== 200) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Error with Jobe server connection' });
    }

    if (response.data.outcome !== 15) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: response.data.cmpinfo, outcome: response.data.outcome });
    }

    return res.status(StatusCodes.OK).json({ output: response.data.stdout });

  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
});


export default editorRouter;
