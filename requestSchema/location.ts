import Joi from "joi";

export const locationSchema = Joi.object({
    name: Joi.string().min(1).max(100),
    latitude: Joi.string().pattern(/^-?\d{1,2}\.\d+$/),
    longitude: Joi.string().pattern(/^-?\d{1,3}\.\d+$/),
}).required()

export const updatedLocationSchema = locationSchema.optional();

