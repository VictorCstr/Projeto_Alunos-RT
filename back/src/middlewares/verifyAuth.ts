import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const secret = process.env.SECRET_KEY as Secret;

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

export default verifyJWT;
