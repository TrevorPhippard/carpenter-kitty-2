import express from "express";
import me from "../data/me.js";

const router = express.Router();

// Get me (optionally filter by userId)
router.get("/", (req, res) => {
  const { userId } = req.query;
  let results = me;
  if (userId) results = me.filter((n) => n.userId === userId);
  res.json(results[0]);
});

export default router;
