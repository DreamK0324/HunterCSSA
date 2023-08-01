import express from "express";
import { MemberModel } from "../models/Member.js";
import { verifyToken } from "./users.js";

const router = express.Router();


// Route to create a new member
router.post('/members', verifyToken, async (req, res) => {
  try {
    const newMember = new MemberModel(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all members
router.get('/members', async (req, res) => {
  try {
    const members = await MemberModel.find({});
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a specific member by ID
router.get('/members/:id', async (req, res) => {
  try {
    const member = await MemberModel.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a member by ID
router.put('/members/:id', verifyToken, async (req, res) => {
  try {
    const updatedMember = await MemberModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated data against the schema
    });

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to delete a member by ID
router.delete('/members/:id', verifyToken, async (req, res) => {
  try {
    const deletedMember = await MemberModel.findByIdAndRemove(req.params.id);

    if (!deletedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { router as membersRouter };
