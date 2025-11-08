import express from "express";
import messages from "../data/messages.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Get messages for a user (threads)
router.get("/", (req, res) => {
  const { userId } = req.query;
  if (!userId)
    return res.status(400).json({ error: "userId query param required" });
  const threads = messages.filter((m) => m.participants.includes(userId));
  res.json({ count: threads.length, results: threads });
});

// Send a message (append to in-memory store)
router.post("/", (req, res) => {
  const { from, to, text } = req.body;
  if (!from || !to || !text)
    return res.status(400).json({ error: "from, to, text required" });
  const threadId = [from, to].sort().join("-");
  let thread = messages.find((t) => t.id === threadId);
  if (!thread) {
    thread = { id: threadId, participants: [from, to], messages: [] };
    messages.push(thread);
  }
  const newMsg = {
    id: uuidv4(),
    from,
    text,
    createdAt: new Date().toISOString(),
  };
  thread.messages.push(newMsg);
  res.status(201).json(newMsg);
});

export default router;
