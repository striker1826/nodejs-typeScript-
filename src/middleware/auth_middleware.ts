import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../util/jwt-util";

export const auth_middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  const [authType, authToken] = authorization.split(" ");
  if (authType !== "Bearer") {
    res.status(401).json({ message: "이용할 수 없습니다" });
  }
  const info = verifyJwt(authToken);
  res.locals.user = info;
  next();
};
