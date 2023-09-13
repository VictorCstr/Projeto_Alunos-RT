import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { createTeacherUseCase } from "../useCases/createTeacherUseCase/index";
import {
  verifyCreateTeacherInputs,
  verifyReleaseGradesInputs,
} from "../middlewares/verifyInputs";
import { loginTeacherUseCase } from "../useCases/loginTeacherUseCase";
import { releaseGradesUseCase } from "../useCases/releaseGradesUseCase";
import verifyJWT from "../middlewares/verifyAuth";
import socket from "../utils/socket";

const teacherRoutes = express.Router();

teacherRoutes.post(
  "/teacher",
  verifyCreateTeacherInputs,
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      logger.info("Requisição recebida na rota POST /teacher");
      logger.info(req.body);

      const createUser = await createTeacherUseCase.execute({
        name,
        email,
        password,
      });

      logger.info("Respostas:");
      logger.info(createUser);

      return res.status(201).json(createUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err || "Unexpected Error" });
    }
  }
);

teacherRoutes.post("/teacher/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    logger.info("Requisição recebida na rota POST /teacher/login");
    logger.info(req.body);

    const login = await loginTeacherUseCase.execute({ email, password });

    logger.info("Resposta:");
    logger.info(login);

    return res.status(200).json(login);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

teacherRoutes.post(
  "/teacher/grades",
  verifyReleaseGradesInputs,
  verifyJWT,
  async (req: Request, res: Response) => {
    try {
      const { id, name, school, activityName, grade } = req.body;
      logger.info("Requisição recebida na rota POST /teacher/login");
      logger.info(req.body);

      const releaseGrade = await releaseGradesUseCase.execute({
        id,
        name,
        school,
        activity: {
          activityName,
          grade,
          school: school,
        },
      });

      logger.info("Resposta:");
      logger.info(releaseGrade);

      socket.emit("newGrades");

      return res.status(200).json(releaseGrade);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err || "Unexpected Error" });
    }
  }
);

export default teacherRoutes;
