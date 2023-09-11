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
      let arrayOfStudents: Student[] = [];

      const gradesBySchool = await prisma.activity.groupBy({
        by: "studentId",
        where: {
          school,
        },
        orderBy: {
          _sum: {
            grade: "desc",
          },
        },
      });

      for (let i = 0; i < gradesBySchool.length; i++) {
        let studentOnRepo = (await prisma.student.findFirst({
          where: {
            id: gradesBySchool[i].studentId,
          },
          select: {
            id: true,
            name: true,
            school: true,
          },
        })) as Student;
        arrayOfStudents[i] = studentOnRepo;
      }
      return arrayOfStudents;
    } catch (e) {
      console.log(e);
      throw new ApiError(400, e as string);
    }
  }

  async getTopRanking(): Promise<Student[]> {
    try {
      let arrayOfStudents: Student[] = [];

      const top3 = await prisma.activity.groupBy({
        by: "studentId",
        orderBy: {
          _sum: {
            grade: "desc",
          },
        },
        take: 3,
      });

      for (let i = 0; i < top3.length; i++) {
        let studentOnRepo = (await prisma.student.findFirst({
          where: {
            id: top3[i].studentId,
          },
          select: {
            id: true,
            name: true,
            school: true,
          },
        })) as Student;
        arrayOfStudents[i] = studentOnRepo;
      }
      return arrayOfStudents;
    } catch (e) {
      console.log(e);
      throw new ApiError(400, e as string);
    }
  }
}
