const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(100).required(),
            rooms: Joi.array().required(),

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            type: Joi.string().min(3).max(100),
            name:Joi.string().min(3).max(100),
            activation: Joi.boolean(),
            membershipExpiryDate: Joi.date(),
            password: Joi.string().min(4).max(100),
            email: Joi.string().min(3).max(100),
            website:Joi.string().min(9).max(100),
            phoneNumber:Joi.number(),
            description:Joi.string().min(10).max(1000),
            facilities: Joi.array(),
            rooms:Joi.array()
        }

        return Joi.validate(request, updateSchema)
    }, 
}