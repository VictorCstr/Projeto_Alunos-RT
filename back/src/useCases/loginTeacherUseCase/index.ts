import { MySqlTeacherRepository } from "../../repositories/MySqlTeacherRepository";
import { LoginTeacherUseCase } from "./loginTeacherUseCase";

const teacherRepository = new MySqlTeacherRepository();

const loginTeacherUseCase = new LoginTeacherUseCase(teacherRepository);

export { loginTeacherUseCase };
