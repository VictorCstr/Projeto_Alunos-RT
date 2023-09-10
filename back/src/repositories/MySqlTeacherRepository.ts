import { PrismaClient } from "@prisma/client";
import { ApiError } from "../errors";
import logger from "../utils/logger";
import { ITeacherRepository } from "../interfaces/ITeacherRepository";
import { Teacher } from "../entities/Teacher";
import { Activity } from "../entities/Activity";

const prisma = new PrismaClient();

export class MySqlTeacherRepository implements ITeacherRepository {
  constructor() {}
  async create(teacher: Teacher): Promise<Boolean> {
    try {
      throw new Error("Method not implemented yet");
    } catch (e) {
      throw new Error("Method not implemented yet");
    }
  }
  async login(email: string, password: string): Promise<Boolean> {
    try {
      throw new Error("Method not implemented yet");
    } catch (e) {
      throw new Error("Method not implemented yet");
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
      throw new Error("Method not implemented yet");
    } catch (e) {
      throw new Error("Method not implemented yet");
    }
  }
}
