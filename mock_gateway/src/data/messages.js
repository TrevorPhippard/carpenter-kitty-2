export default [
  {
    id: "u1-u2",
    participants: ["u1", "u2"],
    messages: [
      {
        id: "m1",
        from: "u1",
        text: "Hey Liam — quick question about gRPC",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
      {
        id: "m2",
        from: "u2",
        text: "Sure — happy to help!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      },
    ],
  },
];
