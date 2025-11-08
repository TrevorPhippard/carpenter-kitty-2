import express from "express";
import users from "../data/users.js";

const router = express.Router();

// List users or search by query `q`
router.get("/", (req, res) => {
  const { q } = req.query;
  if (q) {
    const lower = q.toLowerCase();
    const results = users.filter(
      (u) =>
        u.name.toLowerCase().includes(lower) ||
        (u.headline || "").toLowerCase().includes(lower)
    );
    return res.json({ count: results.length, results });
  }
  res.json({ count: users.length, results: users });
});

// Get user by id
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

export default router;
