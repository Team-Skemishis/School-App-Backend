import Joi from "joi";

export const addStaffValidator = Joi.object({
    firstname: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required().email(),
    gender: Joi.string().required().valid('male', 'female'),
    image: Joi.string().required()
})

export const updateStaffValidator = Joi.object({
    firstname: Joi.string(),
    surname: Joi.string(),
    email: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    image: Joi.string()
})