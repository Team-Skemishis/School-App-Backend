import Joi from "joi";

export const addTimetableValidator = Joi.object({
    classes: Joi.string().required(),
    subject: Joi.string().required(),
    teacher: Joi.string().required(),
    day: Joi.string().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday').required(),
    startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(), // Matches HH:MM format
    endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
});
