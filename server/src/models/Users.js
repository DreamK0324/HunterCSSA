import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  canCreateFact: { type: Boolean, default: false },
  savedFacts: [{type: mongoose.Schema.Types.ObjectId, ref: "facts"}],
});

export const UserModel = mongoose.model("users", UserSchema);