import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();
const secret = process.env.JWT_SECRET;

// get all users
router.get("/", async (req, res) => {
  try {
    const result = await UserModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single user by ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// register
router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, email });
    await newUser.save();
    res.json({ message: "User registered successfully" });
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, secret);
  res.json({ token, userID: user._id });
});

// verify token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, secret, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// update user data for finding mate
router.put("/mate", verifyToken, async (req, res) => {
  const { userOwner } = req.body; 
  const { major, minor, gradYear, borough } = req.body; 

  try {
    const user = await UserModel.findById(userOwner);
    if (!user) {
      return res.status(406).json({ message: "User not found" });
    }

    user.major = major;
    user.minor = minor;
    user.gradYear = gradYear;
    user.borough = borough;

    await user.save();

    res.json({ message: "User data updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});


// get the result of mates
router.get("/mate/search", verifyToken, async (req, res) => {
  try {
    const { major, minor, gradYear, borough } = req.query;

    let matchMajor = [];
    if (major) {
      matchMajor = await UserModel.find({ major });
    }
    
    let matchMinor = [];
    if (minor) {
      matchMinor = await UserModel.find({ minor });
    }
    
    let matchGradYear = [];
    if (gradYear) {
      matchGradYear = await UserModel.find({ gradYear });
    }

    let matchBorough = [];
    if (borough) {
      matchBorough = await UserModel.find({ borough });
    }

    const searchResults = {
      matchMajor: matchMajor,
      matchMinor: matchMinor,
      matchGradYear: matchGradYear,
      matchBorough: matchBorough,
    };

    res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching for users." });
  }
});




export { router as usersRouter };


