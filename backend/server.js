import express from "express";
import cors from 'cors';
import editorRouter from "./routes/editor.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// test endpoint
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(editorRouter);

app.listen(PORT, () => {
  console.log(`Server has started listening on port ${PORT}`);
});
