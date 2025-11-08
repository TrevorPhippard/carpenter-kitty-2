import express from "express";
import cors from "cors";
import morgan from "morgan";

import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import feedRouter from "./routes/feed.js";
import notificationsRouter from "./routes/notifications.js";
import messagesRouter from "./routes/messages.js";
import searchRouter from "./routes/search.js";
import networkRouter from "./routes/network.js";
import meRouter from "./routes/me.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Define a single API router prefix
const api = express.Router();

api.use("/users", usersRouter);
api.use("/posts", postsRouter);
api.use("/feed", feedRouter);
api.use("/notifications", notificationsRouter);
api.use("/messages", messagesRouter);
api.use("/search", searchRouter);
api.use("/network", networkRouter);
api.use("/me", meRouter);

// /api/me

// Mount the API router under /api prefix
app.use("/api", api);

app.get("/", (req, res) =>
  res.json({ ok: true, message: "Mock API Gateway running" })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Mock API Gateway listening on port ${PORT}`)
);
