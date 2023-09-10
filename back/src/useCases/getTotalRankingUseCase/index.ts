import { MySqlGradesRepository } from "../../repositories/MySqlGradesRepository";
import { GetTotalRankingUseCase } from "./getTotalRankingUseCase";

const gradesRepository = new MySqlGradesRepository();

const getTotalRankingUseCase = new GetTotalRankingUseCase(gradesRepository);

export { getTotalRankingUseCase };
