import express from "express";
import { FactModel } from "../models/Facts.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const result = await FactModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Create a new fact
router.post("/", verifyToken, async (req, res) => {
    const fact = new FactModel(req.body);
    console.log(fact);
  
    try {
      const result = await fact.save();
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Get an fact by ID
router.get("/:factId", async (req, res) => {
    try {
      const result = await FactModel.findById(req.params.factId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Save an fact
router.put("/", async (req, res) => {
    const fact = await FactModel.findById(req.body.factId);
    const user = await UserModel.findById(req.body.userId);
    try {
      user.savedFacts.push(fact);
      await user.save();
      res.status(201).json({ savedFacts: user.savedFacts });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Get id of saved facts
router.get("/savedFacts/ids/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      res.status(201).json({ savedFacts: user?.savedFacts });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Get saved facts
router.get("/savedFacts/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      const savedFacts = await FactModel.find({
        _id: { $in: user.savedFacts },
      });
  
      console.log(savedFacts);
      res.status(201).json({ savedFacts });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});




export { router as factsRouter };
