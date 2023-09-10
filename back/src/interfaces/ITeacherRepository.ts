import { Teacher } from "../entities/Teacher";
import { Activity } from "../entities/Activity";

export interface IUserRepository {
  create(teacher: Teacher): Promise<Boolean>;
  login(email: string, password: string): Promise<Boolean>;
  releaseGrades(activity: Activity): Promise<Boolean>;
}
