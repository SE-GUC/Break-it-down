const Joi = require('joi')

module.exports = {
    updateValidation: request => {

        const updateSchema = {

            id:Joi.number().min(1),

            firstname: Joi.string().min(3).max(100),

            lastname: Joi.string().min(3).max(100),

            age: Joi.number().min(15)

        }
        
        return Joi.validate(updateSchema)

    }, 

}