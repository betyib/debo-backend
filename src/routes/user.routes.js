import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

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

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

export default router;