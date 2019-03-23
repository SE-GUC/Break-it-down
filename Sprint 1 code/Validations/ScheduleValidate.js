const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
          //  idC: Joi.number().required(),
          //  idR: Joi.number().required(),
            idS: Joi.number().required(),
           // Date: Joi.date().required(),
           Date: Joi.date(), 
           time: Joi.number().required()
           
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            idC: Joi.number.required(),
            idR: Joi.number().required(),
            idS: Joi.number().required(),
            Date: Joi.date().required(),
            time: Joi.number().required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}