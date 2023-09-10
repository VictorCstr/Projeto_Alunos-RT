import { MySqlTeacherRepository } from "../../repositories/MySqlTeacherRepository";
import { ReleaseGradesUseCase } from "./releaseGradesUseCase";

const teacherRepository = new MySqlTeacherRepository();

const releaseGradesUseCase = new ReleaseGradesUseCase(teacherRepository);

export { releaseGradesUseCase };
