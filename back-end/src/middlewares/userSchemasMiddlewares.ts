import { userSignUpSchema, userSignInSchema, usernameUpdateSchema, userDeleteSchema } from "../schemas/userSchemas";
import { Request, Response, NextFunction } from 'express';

export const userSignUpMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validation = userSignUpSchema.validate(req.body);

  if (validation.error) {
    res.status(422).send(validation.error.details[0].message);
    return;
  }

  next();
};

export const userSignInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validation = userSignInSchema.validate(req.body);

  if (validation.error) {
    res.status(422).send(validation.error.details[0].message);
    return;
  }

  next();
};

export const usernameUpdateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validation = usernameUpdateSchema.validate(req.body);

  if (validation.error) {
    res.status(422).send(validation.error.details[0].message);
    return;
  }

  next();
};

export const userDeleteMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validation = userDeleteSchema.validate(req.body);

  if (validation.error) {
    res.status(422).send(validation.error.details[0].message);
    return;
  }

  next();
};