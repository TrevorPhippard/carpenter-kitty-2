export default [
  {
    id: "n1",
    userId: "u1",
    type: "like",
    fromUserId: "u2",
    message: "Liam Carter liked your post",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: false,
  },
  {
    id: "n2",
    userId: "u1",
    type: "comment",
    fromUserId: "u3",
    message: "Maya Singh commented on your post",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
  },
];
