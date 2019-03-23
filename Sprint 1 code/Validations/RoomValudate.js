const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            idCoworkingSpace: Joi.number.required(),
            idRoom: Joi.number().required(),
            Date: Joi.date().required(),
            time: Joi.number().required()
           
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            idCoworkingSpace: Joi.number.required(),
            idRoom: Joi.number().required(),
            Date: Joi.date().required(),
            time: Joi.number().required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}