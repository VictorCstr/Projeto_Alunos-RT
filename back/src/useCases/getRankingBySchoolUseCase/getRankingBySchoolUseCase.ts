import { IGetRankingBySchoolDTO } from "./getRankingBySchoolDTO";
import { ITeacherRepository } from "../../interfaces/ITeacherRepository";
import { ApiError } from "../../errors";
import { SuccessMessage } from "../../entities/SuccessMessage";
import { IGradeRepository } from "../../interfaces/IGradeRepository";
import { School } from "../../entities/enums/School";
import { Student } from "../../entities/Student";

export class GetRankingBySchoolUseCase {
  constructor(private gradesRepository: IGradeRepository) {}

  async execute(data: IGetRankingBySchoolDTO): Promise<Student[]> {
    const { school } = data;

    if (school == undefined || school == null) {
      throw new ApiError(
        404,
        "O nome da escola precisa ser definido através do path params"
      );
    }

    return await this.gradesRepository.getRankingBy(school as School);
  }
}
