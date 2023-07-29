import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userRouter } from "./routes/users.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

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