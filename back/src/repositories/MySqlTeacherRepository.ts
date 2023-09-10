import { PrismaClient } from "@prisma/client";
import { ApiError } from "../errors";
import logger from "../utils/logger";
import { ITeacherRepository } from "../interfaces/ITeacherRepository";
import { Teacher } from "../entities/Teacher";
import { Activity } from "../entities/Activity";
import { compareHash } from "../utils/encrypt";
import { signJwt } from "../utils/signJwt";

const prisma = new PrismaClient();

export class MySqlTeacherRepository implements ITeacherRepository {
  constructor() {}
  async create(teacher: Teacher): Promise<Boolean> {
    try {
      await prisma.teacher.create({ data: teacher });

      return true;
    } catch (e) {
      logger.error(e);
      return false;
    }
  }
  async login(email: string, password: string): Promise<string> {
    try {
      const user = (await prisma.teacher.findUnique({
        where: {
          email,
        },
      })) as Teacher;

      const passwordIsCorrect = await compareHash(password, user.password);

      if (passwordIsCorrect == false)
        throw new ApiError(401, "Erro no login, verifique as credenciais.");

      return await signJwt(user);
    } catch (e) {
      logger.error(e);
      throw new ApiError(400, e as string);
    }
  }
  async releaseGrades(activity: Activity): Promise<Boolean> {
    try {
      throw new Error("Method not implemented yet");
    } catch (e) {
      throw new Error("Method not implemented yet");
    }
  }
  async existUser(email: string): Promise<Boolean> {
    try {
      const user = await prisma.teacher.findUnique({
        where: {
          email,
        },
      });
      return user ? true : false;
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error as string);
    }
  }
}
