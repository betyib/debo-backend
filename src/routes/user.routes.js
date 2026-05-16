import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Protected route accessed
 *                 user:
 *                   type: object
 *                   example:
 *                     id: 1
 *                     name: John Doe
 *                     email: john@example.com
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message:
        "Protected route accessed",
      user: req.user,
    });
  }
);

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the authenticated user's profile information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

export default router;