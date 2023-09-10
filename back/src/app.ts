import express from "express";
import cors from "cors";
import compression from "compression";
import teacherRoutes from "./routes/TeacherRouter";
import routes from "./routes/GradesRouter";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());

app.use(teacherRoutes);
app.use(routes);

export default app;
