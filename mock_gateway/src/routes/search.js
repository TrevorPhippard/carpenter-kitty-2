import express from "express";
import users from "../data/users.js";
import posts from "../data/posts.js";

const router = express.Router();

// ?q=term&type=user|post
router.get("/", (req, res) => {
  const { q = "", type } = req.query;
  const term = q.toLowerCase();
  const results = {};

  if (!q) return res.json({ results: { users: [], posts: [] } });

  if (!type || type === "user") {
    results.users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        (u.headline || "").toLowerCase().includes(term)
    );
  }
  if (!type || type === "post") {
    results.posts = posts.filter(
      (p) =>
        p.text.toLowerCase().includes(term) ||
        (p.title || "").toLowerCase().includes(term)
    );
  }

  res.json({ query: q, type: type || "all", results });
});

export default router;
