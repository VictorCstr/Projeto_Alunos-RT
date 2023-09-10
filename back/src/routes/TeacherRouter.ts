import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { createTeacherUseCase } from "../useCases/createTeacherUseCase/index";
import verifyInputs from "../middlewares/verifyInputs";
import { loginTeacherUseCase } from "../useCases/loginTeacherUseCase";

const teacherRoutes = express.Router();

teacherRoutes.post(
  "/teacher",
  verifyInputs,
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

export default teacherRoutes;
