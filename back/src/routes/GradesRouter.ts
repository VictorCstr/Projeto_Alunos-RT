import express, { Request, Response } from "express";
import logger from "../utils/logger";
import { getRankingBySchoolUseCase } from "../useCases/getRankingBySchoolUseCase";
import { School } from "../entities/enums/School";
import { verifyGetByRankingInputs } from "../middlewares/verifyInputs";
import { getTotalRankingUseCase } from "../useCases/getTotalRankingUseCase";

const routes = express.Router();

routes.get(
  "/grades/:school",
  verifyGetByRankingInputs,
  async (req: Request, res: Response) => {
    try {
      const school = req.params.school as string;

      logger.info("Requisição recebida na rota GET /grades");
      logger.info(req.body);

      const ranking = await getRankingBySchoolUseCase.execute({ school });

      logger.info("Resposta:");
      logger.info(ranking);

      return res.status(200).json(ranking);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err || "Unexpected Error" });
    }
  }
);

routes.get("/grades", async (req: Request, res: Response) => {
  try {
    logger.info("Requisição recebida na rota GET /grades");

    const ranking = await getTotalRankingUseCase.execute();

    logger.info("Resposta:");
    logger.info(ranking);

    return res.status(200).json(ranking);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err || "Unexpected Error" });
  }
});

export default routes;
