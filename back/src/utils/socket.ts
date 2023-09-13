import http from "../cluster";

const io = require("socket.io")(http!, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket"],
  },
});

export default io;
