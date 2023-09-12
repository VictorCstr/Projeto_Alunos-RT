import bcrypt from "bcrypt";
import { ApiError } from "../errors";
import { ITeacherRepository } from "../interfaces/ITeacherRepository";
import { Teacher } from "../entities/Teacher";
import { Student } from "../entities/Student";
import { Activity } from "../entities/Activity";
import { School } from "../entities/enums/School";
import { compareHash } from "../utils/encrypt";
import { signJwt } from "../utils/signJwt";

export class FakeTeacherRepository implements ITeacherRepository {
  private teachers: Teacher[] = [
    {
      id: "1",
      name: "Victor",
      email: "victor@teste.com",
      password: "$2b$10$UXdibzMOCHkL/6xUvmahXeiJVNE8I7iXW3WaXeY3ZcngJ4ZHXMyw2",
    },
  ];
  private students: Student[] = [
    {
      id: "1",
      name: "Victor",
      school: School.Dados,
    },
  ];
  async create(teacher: Teacher): Promise<Boolean> {
    this.teachers.push(teacher);
    return true;
  }
  async createStudent(student: Student): Promise<boolean> {
    this.students.push(student);
    return true;
  }
  async existUser(email: string): Promise<Boolean> {
    const teacher = this.teachers.find((teach) => teach.email == email);
    return teacher ? true : false;
  }
  async existStudent(studentId: string): Promise<boolean> {
    const student = this.students.find((stud) => stud.id == studentId);
    return student ? true : false;
  }
  async login(email: string, password: string): Promise<string> {
    const teacher = this.teachers.find((teach) => teach.email == email);

    const passwordIsCorrect = await compareHash(password, teacher!.password);

    if (passwordIsCorrect == false)
      throw new ApiError(401, "Erro no login, verifique as credenciais.");

    return await signJwt(teacher!);
  }
  async releaseGrades(activity: Activity, studentId: string): Promise<Boolean> {
    const student = this.students.find((stud) => stud.id == studentId)!;
    student.activity = activity;
    return true;
  }
}
