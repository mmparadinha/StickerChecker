import Joi from 'joi';

export const userSignUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.string().required().valid(Joi.ref('password'))
});

export const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const usernameUpdateSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export const userDeleteSchema = Joi.object({
  password: Joi.string().required()
});