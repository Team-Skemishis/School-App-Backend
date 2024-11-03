import Joi from "joi";

export const addStudentValidator = Joi.object({
    firstname: Joi.string().required(),
    surname: Joi.string().required(),
    class: Joi.string().required(),
    gender: Joi.string().required().valid('male', 'female'),
    image: Joi.string().required()
})

export const updateStudentValidator = Joi.object({
    firstname: Joi.string(),
    surname: Joi.string(),
    class: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    image: Joi.string()
})