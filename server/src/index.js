import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { usersRouter } from "./routes/users.js";
import { affairsRouter } from "./routes/affairs.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/affairs", affairsRouter);

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