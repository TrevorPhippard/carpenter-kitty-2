import express from "express";
import notifications from "../data/notifications.js";

const router = express.Router();

// Get notifications (optionally filter by userId)
router.get("/", (req, res) => {
  const { userId } = req.query;
  let results = notifications;
  if (userId) results = notifications.filter((n) => n.userId === userId);
  res.json({ count: results.length, results });
});

export default router;
