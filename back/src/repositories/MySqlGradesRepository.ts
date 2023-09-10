import { PrismaClient } from "@prisma/client";
import { ApiError } from "../errors";
import logger from "../utils/logger";
import { IGradeRepository } from "../interfaces/IGradeRepository";
import { School } from "../entities/enums/School";
import { Student } from "../entities/Student";

const prisma = new PrismaClient();

export class MySqlGradesRepository implements IGradeRepository {
  constructor() {}
  async getRankingBy(school: School): Promise<Student[]> {
    try {
      throw new Error("Method not implemented yet");
    } catch (e) {
      throw new Error("Method not implemented yet");
    }
  }

  async getTopRanking(): Promise<Student[]> {
    try {
      throw new Error("Method not implemented yet");
    } catch (e) {
      throw new Error("Method not implemented yet");
    }
  }
}
