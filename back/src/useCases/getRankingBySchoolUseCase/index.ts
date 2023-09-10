import { MySqlGradesRepository } from "../../repositories/MySqlGradesRepository";
import { GetRankingBySchoolUseCase } from "./getRankingBySchoolUseCase";

const gradesRepository = new MySqlGradesRepository();

const getRankingBySchoolUseCase = new GetRankingBySchoolUseCase(
  gradesRepository
);

export { getRankingBySchoolUseCase };
