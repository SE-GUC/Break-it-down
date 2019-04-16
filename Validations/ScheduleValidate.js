const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            
           Date: Joi.date().required(), 
           time: Joi.number().required()
           
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            
            Date: Joi.date(), 
            time: Joi.number()
           
        }

        return Joi.validate(request, updateSchema)
    }, 
}
