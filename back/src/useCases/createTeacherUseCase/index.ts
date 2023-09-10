import { MySqlTeacherRepository } from "../../repositories/MySqlTeacherRepository";
import { CreateTeacherUseCase } from "./createTeacherUseCase";

const teacherRepository = new MySqlTeacherRepository();

const createTeacherUseCase = new CreateTeacherUseCase(teacherRepository);

export { createTeacherUseCase };
