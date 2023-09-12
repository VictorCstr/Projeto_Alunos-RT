import bcrypt from "bcrypt";
import { ApiError } from "../errors";
import { ITeacherRepository } from "../interfaces/ITeacherRepository";
import { Teacher } from "../entities/Teacher";
import { Student } from "../entities/Student";
import { Activity } from "../entities/Activity";
import { School } from "../entities/enums/School";
import { compareHash } from "../utils/encrypt";
import { signJwt } from "../utils/signJwt";
import { IGradeRepository } from "../interfaces/IGradeRepository";

export class FakeGradesRepository implements IGradeRepository {
  public students: Student[] = [
    {
      id: "1",
      name: "Victor",
      school: School.Dados,
      activity: {
        id: "1",
        activityName: "Python",
        grade: 50,
        school: School.Dados,
      },
    },
    {
      id: "2",
      name: "Maria",
      school: School.Dados,
      activity: {
        id: "1",
        activityName: "Python",
        grade: 90,
        school: School.Dados,
      },
    },
    {
      id: "3",
      name: "João",
      school: School.Tecnologia,
      activity: {
        id: "1",
        activityName: "Python",
        grade: 70,
        school: School.Dados,
      },
    },
  ];

  async getRankingBy(school: School): Promise<Student[]> {
    const studentsBySchool = this.students.filter((student) => {
      student.school == school;
    });

    const ordenados = studentsBySchool.sort(function (a, b) {
      return Number(b.activity?.grade) - Number(a.activity?.grade);
    });

    return ordenados;
  }

  async getTopRanking(): Promise<Student[]> {
    const ordenados = this.students.sort(function (a, b) {
      return Number(b.activity?.grade) - Number(a.activity?.grade);
    });

    return ordenados;
  }
}
