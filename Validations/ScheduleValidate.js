const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      scheduleNumber: Joi.number(),
      Date: Joi.date().required(),
      time: Joi.number().required(),
      endTime: Joi.number().required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      scheduleNumber: Joi.number(),
      Date: Joi.date(),
      time: Joi.number(),
      endTime: Joi.number()
    };

    return Joi.validate(request, updateSchema);
  }
};
