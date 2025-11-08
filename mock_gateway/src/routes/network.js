import users from "../data/users.js";

import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const { userId } = req.query;
  res.json({ userId: "userId" });
});

// GET //apinetwork/connections//:id
router.get("/connections/:id", (req, res) => {
  const { id } = req.params;
  res.json(users);
});

// GET //apinetwork/invitations//:id
router.get("/invitations/:id", (req, res) => {
  const { id } = req.params;
  res.json(users);
});

// GET //apinetwork/suggestions//:id
router.get("/suggestions/:id", (req, res) => {
  const { id } = req.params;
  res.json(users);
});

export default router;
