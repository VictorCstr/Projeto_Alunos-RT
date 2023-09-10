import { Teacher } from "../entities/Teacher";
import { Student } from "../entities/Student";
import { Activity } from "../entities/Activity";

export interface ITeacherRepository {
  existUser(email: string): Promise<Boolean>;
  existStudent(studentId: string): Promise<boolean>;
  createStudent(student: Student): Promise<boolean>;
  create(teacher: Teacher): Promise<Boolean>;
  login(email: string, password: string): Promise<string>;
  releaseGrades(activity: Activity, studentId: string): Promise<Boolean>;
}
