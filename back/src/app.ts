import express from "express";
import cors from "cors";
import compression from "compression";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(cors());
// app.use(routes);

export default app;
