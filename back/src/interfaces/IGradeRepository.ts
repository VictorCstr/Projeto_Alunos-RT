import { School } from "../entities/enums/School";
import { Student } from "../entities/Student";

export interface IGradeRepository {
  getTopRanking(): Promise<Student[]>;
  getRankingBy(school: School): Promise<Student[]>;
}
