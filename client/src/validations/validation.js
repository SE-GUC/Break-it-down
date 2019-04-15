const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      contacts: Joi.string()
        .min(3)
        .max(500)
        .required(),
      rooms: Joi.array().items(
        Joi.object({
          capacity: Joi.number.min(65).required(),
          schedule: Joi.array().items(Joi.string())
        })
      )
    };

    return Joi.validate(request, createSchema);
  },

  createRoomValidation: request => {
    const createSchema = {
      capacity: Joi.number.min(65).required(),
      schedule: Joi.array().items(Joi.string())
    };

    return Joi.validate(request, createSchema);
  },

  updateRoomValidation: request => {
    const updateSchema = {
      capacity: Joi.number()
        .min(65)
        .required(),
      schedule: Joi.array()
        .items(Joi.string())
        .required()
    };

    return Joi.validate(request, updateSchema);
  },

  createAccountValidation: request => {
    const createSchema = {
      type: Joi.string(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      phoneNumber: Joi.number().required(),
      field: Joi.string(),
      memberTasks: Joi.array(),
      activation: Joi.boolean(),
      membershipExpiryDate: Joi.date(),
      address: Joi.string(),
      birthday: Joi.date(),
      skills: Joi.array(),
      interests: Joi.array(),
      accomplishments: Joi.array(),
      trainers: Joi.array(),
      trainingPrograms: Joi.array(),
      partners: Joi.array(),
      boardMembers: Joi.array(),
      events: Joi.array(),
      reports: Joi.array(),
      tasks: Joi.array(),
      certificates: Joi.array(),
      website: Joi.string(),
      description: Joi.string(),
      facilities: Joi.array(),
      rooms: Joi.array(),
      updates: Joi.array()
    };

    return Joi.validate(request, createSchema);
  },

  loginValidation: request => {
    const loginSchema = {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    };
    return Joi.validate(request, loginSchema);
  },
  createPostValidation: request => {
    const loginSchema = {
      title: Joi.string().required(),
      content: Joi.string().required(),
      userID: Joi.required(),
      likes: Joi.number()
    };
    return Joi.validate(request, loginSchema);
  }
};
