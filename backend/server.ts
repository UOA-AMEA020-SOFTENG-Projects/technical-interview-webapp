import express, { Request, Response } from "express";
import cors from "cors";
import editorRouter from "./routes/editor.js";
import connectDB from "./database/mongoose.js";
import * as url from "url";
import path from "path";
import problemRouter from "./routes/problem.js";
import topicRouter from "./routes/topic.js";
import userRouter from "./routes/user.js";
import contentRouter from "./routes/content.js";
import questionRouter from "./routes/question.js";
import analyticsRouter from "./routes/analytics.js";

const MONGO_URI = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectDB(MONGO_URI);

app.use(editorRouter);
app.use(problemRouter);
app.use(topicRouter);
app.use(contentRouter);
app.use(userRouter);
app.use(questionRouter);
app.use(analyticsRouter);

app.use((error: any, req: Request, res: Response) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

// Make the "public" folder available statically, all the images and static files we can serve
// to the front end from this folder directly
const dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(path.join(dirname, "./public")));

if (process.env.NODE_ENV === "production") {
  console.log("Running in production!");

  app.use(express.static(path.join(dirname, "../frontend/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server has started listening on port ${PORT}`);
});
