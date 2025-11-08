export default [
  {
    id: "p1",
    userId: "u1",
    text: "Just launched a new side project built with Vue and Go! 🚀",
    content:
      "Check out the full post on my profile. Feedback welcome! #webdev #golang",
    media: ["https://placehold.co/400x300"],
    likes: 45,
    commentsCount: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "p2",
    userId: "u2",
    text: "Deep dive into gRPC and service communication patterns",
    content:
      "I wrote a small article comparing REST, GraphQL, and gRPC in a microservices setup.",
    media: [],
    likes: 22,
    commentsCount: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "p3",
    userId: "u3",
    text: "Reflections from our latest product sprint",
    content:
      "We learned so much from this release cycle — focusing on small iterations really paid off.",
    media: ["https://placehold.co/600x400", "https://placehold.co/400x300"],
    likes: 17,
    commentsCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];
