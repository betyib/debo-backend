import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  createTaskSchema,
} from "../validations/task.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createTaskSchema), createTask);

router.get("/project/:projectId", authMiddleware, getTasksByProject);

router.get("/:id", authMiddleware, getTaskById);

router.put("/:id", authMiddleware, updateTask);

router.delete("/:id", authMiddleware, deleteTask);

router.patch("/:id/status", authMiddleware, updateTaskStatus);

export default router;