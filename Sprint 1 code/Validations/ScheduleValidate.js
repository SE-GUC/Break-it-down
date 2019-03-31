const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            id: Joi.number().required(),
           Date: Joi.date(), 
           time: Joi.number().required(),
           
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            id: Joi.number().required(),
            Date: Joi.date(), 
            time: Joi.number().required(),
            reserved: Joi.boolean().required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}