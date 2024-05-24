import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI!;

const app: Express = express();

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

mongoose.connect(MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
