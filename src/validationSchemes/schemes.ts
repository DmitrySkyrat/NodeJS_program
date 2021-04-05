import * as Joi from "joi";
import {
  ContainerTypes,
  ValidatedRequestSchema,
} from "express-joi-validation";

export interface UserRequestBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
  };
}

const MIN_USER_AGE: number = 4;
const MAX_USER_AGE: number = 130;
const PASSWORD_USER_REGEXP: RegExp = /^([0-9a-zA-Z]+|\d+)$/;

export const userQuerySchema = Joi.object({
  id: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().regex(PASSWORD_USER_REGEXP).required(),
  age: Joi.number().min(MIN_USER_AGE).max(MAX_USER_AGE).required(),
  isDeleted: Joi.boolean().required(),
});
