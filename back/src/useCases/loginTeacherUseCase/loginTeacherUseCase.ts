import { ILoginTeacherDTO } from "./loginTeacherDTO";
import { ITeacherRepository } from "../../interfaces/ITeacherRepository";
import { ApiError } from "../../errors";
import { SuccessMessage } from "../../entities/SuccessMessage";
import { signJwt } from "../../utils/signJwt";

export class LoginTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async execute(data: ILoginTeacherDTO): Promise<SuccessMessage> {
    const { password, email } = data;

    if (!password || !email) {
      throw new ApiError(400, "Dados não informados pelo cliente");
    }

    const existUser = await this.teacherRepository.existUser(email);

    if (existUser != true) {
      throw new ApiError(404, "Usuário não cadastrado");
    }

    const login = await this.teacherRepository.login(email, password);

    return {
      success: true,
      message: login,
    };
  }
}
