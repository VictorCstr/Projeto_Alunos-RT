import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { createTeacherUseCase } from "../useCases/createTeacherUseCase/index";
import verifyInputs from "../middlewares/verifyInputs";

const teacherRoutes = express.Router();

teacherRoutes.post(
  "/teacher",
  verifyInputs,
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const createUser = await createTeacherUseCase.execute({
        name,
        email,
        password,
      });

      logger.info("Requisição recebida na rota POST /pedido");
      logger.info("Requisição:");
      logger.info(req.body);
      logger.info("Respostas:");
      logger.info(createUser);

      return res.status(201).json(createUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err || "Unexpected Error" });
    }
  }
);

// teacherRoutes.get("/", async (req: Request, res: Response) => {
//   try {
//
//     logger.info("Requisição recebida na rota GET /pedidos");
//     logger.info("Resposta:");
//     logger.info(pedidos);

//     return res.status(200).json(pedidos);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ message: err || "Unexpected Error" });
//   }
// });

export default teacherRoutes;
