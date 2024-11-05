import Joi from "joi";

export const addClassValidator = Joi.object({
    classNumber: Joi.string().required(),
    classCategory: Joi.string().required()
})
export const updateClassValidator = Joi.object({
    classNumber: Joi.string(),
    classCategory: Joi.string()
})