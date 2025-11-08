import express from "express";
import posts from "../data/posts.js";
import users from "../data/users.js";

const router = express.Router();

// Very simple feed: return latest posts sorted by createdAt
router.get("/", (req, res) => {
  const { limit = 10 } = req.query;
  const l = Math.max(1, Math.min(50, Number(limit)));
  const items = posts
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, l)
    .map((post) => ({
      ...post,
      author: users.find((u) => u.id === post.authorId) || null,
    }));
  res.json({ count: items.length, results: items });
});

export default router;
