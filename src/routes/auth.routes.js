import express from "express";

import {
  register,
  login,
} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/auth.validation.js";

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account in the system
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

router.post(
  "/register",
  validate(registerSchema),
  register
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates user and returns a token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful (returns token)
 *       401:
 *         description: Invalid credentials
 */

router.post(
  "/login",
  validate(loginSchema),
  login
);

export default router;