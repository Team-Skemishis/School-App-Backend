import Joi from "joi";

export const addAnnouncementValidator = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    userType: Joi.string().valid('all', 'teachers', 'students').required(),
    coverImage: Joi.string()
});
export const updateAnnoucementValidator = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    userType: Joi.string().valid('all', 'teachers', 'students'),
    coverImage: Joi.string()
});
