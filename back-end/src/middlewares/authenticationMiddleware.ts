import { NextFunction, Request, Response } from "express";
import { searchUserBySession } from "../repositories/userRepository";

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const user = await searchUserBySession(token);

    if (!user) return res.sendStatus(401);

    req.userId = user.userId;

    return next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export type AuthenticatedRequest = Request & TokenPayload;

type TokenPayload = {
  userId: number;
};
