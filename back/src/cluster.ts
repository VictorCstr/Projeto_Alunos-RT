import cluster from "cluster";
import os from "os";
import app from "./app";
import logger from "./utils/logger";

const port = Number(process.env.PORT) || 9090;
let io;

if (cluster.isPrimary) {
  logger.info(`Running on master ${process.pid} and now creating workers`);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      logger.info(`Worker ${worker.process.pid} died`);
    });
  }
} else {
  const server = require("http").createServer(app);
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      transports: ["websocket", "polling"],
      credentials: true,
      allowEIO3: true,
    },
  });

  io.on("connect", (socket: any) => {
    console.log("Socket Conectado!");
  });

  app.set("IO", io);

  server.listen(port, "0.0.0.0");
}

export default io;
