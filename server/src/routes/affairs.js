import express from "express";
import mongoose from "mongoose";
import { AffairModel } from "../models/Affairs.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const result = await AffairModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Create a new affair
router.post("/", verifyToken, async (req, res) => {
    const affair = new AffairModel(req.body);
    console.log(affair);
  
    try {
      const result = await affair.save();
      res.status(201).json(result);
    } catch (err) {
      // console.log(err);
      res.status(500).json(err);
    }
});

// Get an affair by ID
router.get("/:affairId", async (req, res) => {
    try {
      const result = await AffairModel.findById(req.params.affairId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Save an affair
router.put("/", async (req, res) => {
    const affair = await AffairModel.findById(req.body.affairId);
    const user = await UserModel.findById(req.body.userId);
    try {
      user.savedAffairs.push(affair);
      await user.save();
      res.status(201).json({ savedAffairs: user.savedAffairs });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Get id of saved affairs
router.get("/savedAffairs/ids/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      res.status(201).json({ savedAffairs: user?.savedAffairs });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Get saved affairs
router.get("/savedAffairs/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      const savedAffairs = await AffairModel.find({
        _id: { $in: user.savedAffairs },
      });
  
      console.log(savedAffairs);
      res.status(201).json({ savedAffairs });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });




export { router as affairsRouter };
