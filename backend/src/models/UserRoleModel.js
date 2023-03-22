import mongoose, { Schema } from "mongoose";

export const UserRole = {
  name: {
    type: String,
    required: true,
  },
};

export const UserRoleSchema = new mongoose.Schema(UserRole, {
  timestamps: true,
});
