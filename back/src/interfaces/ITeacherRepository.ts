import { Teacher } from "../entities/Teacher";
import { Activity } from "../entities/Activity";

export interface ITeacherRepository {
  existUser(email: string): Promise<Boolean>;
  create(teacher: Teacher): Promise<Boolean>;
  login(email: string, password: string): Promise<string>;
  releaseGrades(activity: Activity): Promise<Boolean>;
}
