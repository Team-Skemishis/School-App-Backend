import Joi from "joi";


export const assignmentValidator = Joi.object({
    title: Joi.string().required(),
    questions: Joi.string().required(),
    deadline: Joi.date().required(),
})

export const UpdateAssignmentValidator = Joi.object({
    title: Joi.string(),
    questions: Joi.string(),
    deadline: Joi.date(),
})