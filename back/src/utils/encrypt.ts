import bcrypt from "bcrypt";
import { ApiError } from "../errors";

export async function hashPassword(pass: string) {
  return await bcrypt.hash(pass, 10);
}

export async function compareHash(password: string, hashPass: string) {
  const correct = await bcrypt.compareSync(password, hashPass);
  return correct ? true : false;
}
