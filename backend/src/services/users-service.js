import { User, UserSchema } from "../models/UserModel.js";
import mongoose from "mongoose";

const userModel = mongoose.model("User", UserSchema);

export const getUsers = async () => {
  try {
    return await userModel.find({}).populate(["role", "roles"]);
  } catch (error) {
    console.error(error);
  }
};
export const getOneUser = async (id) => {
  try {
    return await userModel.findById(id).populate(["role", "roles"]);
  } catch (error) {
    console.error(error);
  }
};
export const createUser = async (user) => {
  try {
    // const createUserRole = await (await userModel.create(user)).populate('role')
    return await (await userModel.create(user)).populate(["role", "roles"]);
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    return await userModel
      .findByIdAndUpdate(id, user, { new: true })
      .populate(["role", "roles"]);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    return await userModel.findByIdAndDelete(id).populate(["role", "roles"]);
  } catch (error) {
    console.error(error);
  }
};
