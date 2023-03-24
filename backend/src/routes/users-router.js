import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../services/users-service.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, async (req, res) => {
  res.json(await getUsers());
});
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await getOneUser(id));
});

userRouter.post("/", async (req, res) => {
  const user = req.body;
  res.json(await createUser(user));
});

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  res.json(await updateUser(id, user));
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await deleteUser(id));
});
export default userRouter;
