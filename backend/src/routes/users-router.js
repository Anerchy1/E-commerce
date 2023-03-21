import express from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../services/users-service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getUsers());
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await getOneUser(id));
});

router.post("/", async (req, res) => {
  const user = req.body;
  res.json(await createUser(user));
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  res.json(await updateUser(id, user));
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await deleteUser(id));
});
export default router;
