import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi)

export const addClassValidator = Joi.object({
    classNumber: Joi.string().required(),
    classCategory: Joi.string().required(),
    classTeacher:Joi.objectId().required()
})
export const updateClassValidator = Joi.object({
    classNumber: Joi.string(),
    classCategory: Joi.string(),
    classTeacher: Joi.objectId()
})