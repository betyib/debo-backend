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

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design database schema
 *               description:
 *                 type: string
 *                 example: Create Prisma models for projects and tasks
 *               projectId:
 *                 type: string
 *                 example: 123abc
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post("/", authMiddleware, validate(createTaskSchema), createTask);

/**
 * @openapi
 * /api/tasks/project/{projectId}:
 *   get:
 *     summary: Get all tasks for a project
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks for a project
 *       401:
 *         description: Unauthorized
 */

router.get("/project/:projectId", authMiddleware, getTasksByProject);

/**
 * @openapi
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

router.get("/:id", authMiddleware, getTaskById);

/**
 * @openapi
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

router.put("/:id", authMiddleware, updateTask);

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

router.delete("/:id", authMiddleware, deleteTask);

/**
 * @openapi
 * /api/tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     description: Change the status of a task (e.g., todo → in-progress → done)
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: in-progress
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *       400:
 *         description: Invalid status value
 *       401:
 *         description: Unauthorized
 */

router.patch("/:id/status", authMiddleware, updateTaskStatus);

export default router;