import { UserRoleSchema } from "../models/UserRoleModel.js";
import mongoose from "mongoose";

const userRoleModel = mongoose.model("UserRole", UserRoleSchema);

export const getUserRole = async () => {
  try {
    return await userRoleModel.find({});
  } catch (error) {
    console.error(error);
  }
};
export const getOneUserRole = async (id) => {
  try {
    return await userRoleModel.findById(id);
  } catch (error) {
    console.error(error);
  }
};
export const createUserRole = async (userRole) => {
  try {
    return await userRoleModel.create(userRole);
  } catch (error) {
    console.error(error);
  }
};

export const updateUserRole = async (id, userRole) => {
  try {
    return await userRoleModel.findByIdAndUpdate(id, userRole, { new: true });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserRole = async (id) => {
  try {
    return await userRoleModel.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
  }
};

//641ac8da5aabbd7f1a940b96 Admin id

// 641ad933d8338a67bffab0c1 User id
