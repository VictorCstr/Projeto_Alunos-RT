import cluster from "cluster";
import os from "os";
import app from "./app";
import logger from "./utils/logger";

const port = Number(process.env.PORT) || 9090;

if (cluster.isPrimary) {
  logger.info(`Running on master ${process.pid} and now creating workers`);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      logger.info(`Worker ${worker.process.pid} died`);
    });
  }
} else {
  app.listen(port, "0.0.0.0");
}
