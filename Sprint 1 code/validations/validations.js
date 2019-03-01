const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            contacts: Joi.string().min(3).max(500).required(),
            rooms: Joi.array().items(Joi.object({
                capacity: Joi.number.min(65).required(),
                schedule: Joi.array().items(Joi.string())

            }))
            
        }

        return Joi.validate(request, createSchema)
    },


    createRoomValidation: request => {
        const createSchema = {
                capacity: Joi.number.min(65).required(),
                schedule: Joi.array().items(Joi.string())

            }
            
        

        return Joi.validate(request, createSchema)
    },

    updateRoomValidation: request => {
        const updateSchema = {
            capacity: Joi.number().min(65).required(),
            schedule: Joi.array().items(Joi.string()).required()
        }

        return Joi.validate(request, updateSchema)
    }, 
}