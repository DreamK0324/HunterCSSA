import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  membername: { 
    type: String, 
    required: true, 
  },

  role: {
    type: String, 
  },

  department: {
    type: String, 
    required: true, 
  },

  contact: {
    type: String, 
    required: true, 
  },

  description:{
    type: String, 
    required: true, 
  },

  profilePic: { 
    type: String,
  },

  
});

export const MemberModel = mongoose.model("members", MemberSchema);