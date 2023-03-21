import mongoose from "mongoose";

export const User = {
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
};

export const UserSchema = new mongoose.Schema(User, { timestamps: true });
