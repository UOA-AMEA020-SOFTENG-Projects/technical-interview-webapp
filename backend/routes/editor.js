import express from "express";
import { spawn } from "child_process";
import { StatusCodes } from "http-status-codes";

const editorRouter = new express.Router();

// hardcoded for now because db hasnt been set up
const MODEL_ANSWER = "hey there friend"

/**
 * Endpoint #1: POST
 * Check similarity score of written description
 * 
 * REVISED VERSION: will obviously have to also supply the question id so that the endpoint can fetch the
 * actual model answer
 */
editorRouter.put("/editor/similarity", async (req, res) => {
    try {
        const answer = req.body;
        const submittedAnswer = answer.answer; 
        const modelAnswer = MODEL_ANSWER;

        const python = spawn('python', ['./sbert/sbert.py', '--text1', submittedAnswer, '--text2', modelAnswer]);

        let dataPromise = new Promise((resolve, reject) => {
            python.stdout.on('data', (data) => {
                console.log(`Similarity Score: ${data}`);
                resolve(data.toString()); 
            });

            python.stderr.on('data', (data) => {
                console.error(`Error occurred: ${data}`);
                reject(new Error(data.toString()));  
            });

            python.on('close', (code) => {
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


export default editorRouter;
