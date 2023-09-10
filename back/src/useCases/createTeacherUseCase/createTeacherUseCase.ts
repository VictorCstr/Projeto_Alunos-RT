import { ICreateTeacherDTO } from "./createTeacherDTO";
import { ITeacherRepository } from "../../interfaces/ITeacherRepository";
import { ApiError } from "../../errors";
import { SuccessMessage } from "../../entities/SuccessMessage";
import { Teacher } from "../../entities/Teacher";

export class CreateTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async execute(data: ICreateTeacherDTO): Promise<SuccessMessage> {
    const { name, email, password } = data;

    const existUser = await this.teacherRepository.existUser(email);

    if (existUser == true) {
      throw new ApiError(404, "Endereço de email já em uso");
    }

    const newUser = new Teacher({
      email,
      name,
      password,
    });

    const creatingUser = await this.teacherRepository.create(newUser);

    if (existUser == false) {
      throw new ApiError(404, "Falha ao criar o Usuário");
    }

    return {
      success: true,
      message: "Criação do usuário enviado com sucesso",
    };
  }
}
