import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi)

export const registerUserValidator= Joi.object({
    classes: Joi.objectId().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    avatar: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    role: Joi.string().valid('teacher', 'student', 'admin')
})

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required().valid('teacher', 'student', 'admin')
})