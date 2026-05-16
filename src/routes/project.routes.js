import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  createProjectSchema,
} from "../validations/project.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createProjectSchema),
  createProject);

router.get("/", authMiddleware, getProjects);

router.get("/:id", authMiddleware, getProjectById);

router.put("/:id", authMiddleware, updateProject);

router.delete("/:id", authMiddleware, deleteProject);

export default router;