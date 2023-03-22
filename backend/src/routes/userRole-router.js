import express from "express";
import {
  createUserRole,
  deleteUserRole,
  getOneUserRole,
  getUserRole,
  updateUserRole,
} from "../services/userRole-service.js";

const userRoleRouter = express.Router();

userRoleRouter.get("/", async (req, res) => {
  res.json(await getUserRole());
});
userRoleRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await getOneUserRole(id));
});

userRoleRouter.post("/", async (req, res) => {
  const userRole = req.body;
  res.json(await createUserRole(userRole));
});

userRoleRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const userRole = req.body;
  res.json(await updateUserRole(id, userRole));
});

userRoleRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await deleteUserRole(id));
});
export default userRoleRouter;
