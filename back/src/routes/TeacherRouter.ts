import express, { Request, Response } from "express";
import logger from "../utils/logger";

const teacherRoutes = express.Router();

// teacherRoutes.post(
//   "/",
//   verificarInputs,
//   async (req: Request, res: Response) => {
//     try {
//
//       logger.info("Requisição recebida na rota POST /pedido");
//       logger.info("Requisição:");
//       logger.info(req.body);
//       logger.info("Respostas:");
//       logger.info(pedido);

//       return res.status(201).json(pedido);
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({ message: err || "Unexpected Error" });
//     }
//   }
// );

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
