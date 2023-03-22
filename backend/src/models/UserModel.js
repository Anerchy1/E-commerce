import mongoose, { Schema, SchemaType } from "mongoose";

export const User = {
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "UserRole",
  },
  roles: {
    type: [Schema.Types.ObjectId],
    ref: "UserRole",
  },
};

export const UserSchema = new mongoose.Schema(User, { timestamps: true });
