import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { usersRouter } from "./routes/users.js";
import { factsRouter } from "./routes/facts.js";
import { membersRouter } from "./routes/members.js";
import bodyParser from "body-parser";




const app = express();


// Set the maximum request body size to 10MB (or adjust as needed)
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));


app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/facts", factsRouter);
app.use("/about", membersRouter);

dotenv.config();
const URL = process.env.URL;

mongoose.connect(
    URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
);
  
app.listen(5001, () => console.log("Server started"));