import { NextFunction, Request, Response } from "express";
import {
  emailIsCorrect,
  gradeIsCorrect,
  nameIsCorrect,
  passwordIsCorrect,
  schoolIsCorrect,
} from "../utils/validateInputs";
import { School } from "../entities/enums/School";

export async function verifyCreateTeacherInputs(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function verifyReleaseGradesInputs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { school } = req.body;
  const { name, grade } = req.body.activity;

  const verifySchool = await schoolIsCorrect(school);
  const verifyGrade = await gradeIsCorrect(grade);
  const verifyName = await nameIsCorrect(name);

  if (verifyGrade.sucess == false) {
    return res.status(400).json({ error: verifyGrade.result });
  } else if (verifyName.sucess == false) {
    return res.status(400).json({ error: verifyName.result });
  } else if (verifySchool.sucess == false) {
    return res.status(400).json({ error: verifySchool.result });
  } else {
    next();
  }
}

export async function verifyGetByRankingInputs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const school = req.params.school as School;

  const verifySchool = await schoolIsCorrect(school);

  if (verifySchool.sucess == false) {
    return res.status(400).json({ error: verifySchool.result });
  } else {
    next();
  }
}
