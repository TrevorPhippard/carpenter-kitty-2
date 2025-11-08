import express from "express";
import posts from "../data/posts.js";
import users from "../data/users.js";

const router = express.Router();

// List posts (basic pagination support)
router.get("/", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const p = Math.max(1, Number(page));
  const l = Math.max(1, Math.min(100, Number(limit)));
  const start = (p - 1) * l;
  const pageItems = posts.slice(start, start + l).map((post) => ({
    ...post,
    author: users.find((u) => u.id === post.authorId) || null,
  }));
  res.json({ page: p, limit: l, total: posts.length, results: pageItems });
});

// Single post
router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  const author = users.find((u) => u.id === post.authorId) || null;
  res.json({ ...post, author });
});

export default router;
