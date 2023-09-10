import { IReleaseGradesDTO } from "./releaseGradesDTO";
import { ITeacherRepository } from "../../interfaces/ITeacherRepository";
import { ApiError } from "../../errors";
import { SuccessMessage } from "../../entities/SuccessMessage";
import { Teacher } from "../../entities/Teacher";
import { hashPassword } from "../../utils/encrypt";
import { Student } from "../../entities/Student";
import { Activity } from "../../entities/Activity";

export class ReleaseGradesUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async execute(data: IReleaseGradesDTO): Promise<SuccessMessage> {
    const { id, name, school, activity } = data;
    let releaseGrades;

    const newActivity = new Activity({
      school: school,
      grade: activity.grade,
      name: activity.name,
    });

    const existStudent = await this.teacherRepository.existStudent(id);

    if (existStudent) {
      releaseGrades = await this.teacherRepository.releaseGrades(
        newActivity,
        id
      );
    } else {
      const student = new Student({
        id,
        name,
        school,
      });

      await this.teacherRepository.createStudent(student);

      releaseGrades = await this.teacherRepository.releaseGrades(
        newActivity,
        id
      );
    }

    if (releaseGrades == false) {
      throw new ApiError(404, "Falha ao lançar notas");
    }

    return {
      success: true,
      message: "Lançamento de notas feita com sucesso",
    };
  }
}
