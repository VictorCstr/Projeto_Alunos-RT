import { NextFunction, Request, Response } from "express";
import {
  emailIsCorrect,
  nameIsCorrect,
  passwordIsCorrect,
} from "../utils/validateInputs";

async function verifyInputs(req: Request, res: Response, next: NextFunction) {
  const { name, password, email } = req.body;

  const verifyEmail = await emailIsCorrect(email);
  const verifyPassword = await passwordIsCorrect(password);
  const verifyName = await nameIsCorrect(name);

  if (verifyEmail.sucess == false) {
    return res.status(400).json({ error: verifyEmail.result });
  } else if (verifyPassword.sucess == false) {
    return res.status(400).json({ error: verifyPassword.result });
  } else if (verifyName.sucess == false) {
    return res.status(400).json({ error: verifyName.result });
  } else {
    next();
  }
}

export default verifyInputs;
