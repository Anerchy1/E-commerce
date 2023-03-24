import { User, UserSchema } from "../models/UserModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userModel = mongoose.model("User", UserSchema);

export const signUpUser = async ({ email, password }) => {
  password = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password, name: email.split("@")[0] });
  return user;
};

export const signInUser = async ({ email, password }) => {
  if (!email) {
    return { success: false, status: 400, message: "Email required" };
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return { success: false, status: 400, message: "User not found" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, status: 400, message: "Password is not matching" };
  }
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    "SecretToken-Key",
    { expiresIn: "1h" }
  );
  return {
    success: true,
    status: 200,
    message: "Login Success",
    body: { user, token },
  };
};

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
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
  }
};
