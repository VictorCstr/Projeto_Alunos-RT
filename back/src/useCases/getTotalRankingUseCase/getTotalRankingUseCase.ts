import { ITeacherRepository } from "../../interfaces/ITeacherRepository";
import { ApiError } from "../../errors";
import { SuccessMessage } from "../../entities/SuccessMessage";
import { IGradeRepository } from "../../interfaces/IGradeRepository";
import { School } from "../../entities/enums/School";
import { Student } from "../../entities/Student";

export class GetTotalRankingUseCase {
  constructor(private gradesRepository: IGradeRepository) {}

  async execute(): Promise<Student[]> {
    return await this.gradesRepository.getTopRanking();
  }
}
