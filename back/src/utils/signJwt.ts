import jwt from "jsonwebtoken";
import { Teacher } from "../entities/Teacher";

const secretKey = process.env.SECRET_KEY as string;

export async function signJwt(teacher: Teacher) {
  return jwt.sign(
    {
      id: teacher.id,
      name: teacher.name,
    },
    secretKey,
    {
      expiresIn: 300,
    }
  );
}
