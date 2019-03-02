const express = require('express');
const router = express.Router();
const Joi = require('joi');
const uuid = require('uuid');


const Profiles = require('../../models/UserProfile');

router.get('/Users', (req, res) => res.json({ data: Profiles }));


//member
router.post('/member', (req, res) => {

	const name = req.body.name
    const birthday = req.body.birthday
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const skills=req.body.skills;
    const interests=req.body.interests;
    const accomplishments=req.body.accomplishments;
    const certificates=req.body.certificates;
   
	const schema = {

		name: Joi.string().min(3).required(),
        birthday: Joi.date(),
        email:Joi.string().required().email(),
        phoneNumber:Joi.number().required(),
        skills:Joi.array(),
        interests:Joi.array(),
        accomplishments:Joi.array(),
        certificates:Joi.array()
   
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newUser = {

         id:uuid.v4(),
         type:'member',
         name,
         birthday,
         email,
         phoneNumber,
         skills,
         interests,
         accomplishments,
         certificates

    };
    Profiles.push(newUser);

	return res.json({ data: Profiles });

});

//consultancyAgency
router.post('/consultancyAgency', (req, res) => {
	const name = req.body.name
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const address=req.body.address;
    const description=req.body.description;
    const partners=req.body.partners;
    const boardMembers=req.body.boardMembers;
    const events=req.body.events;
    const reports=req.body.reports;
   
	const schema = {

		name: Joi.string().min(3).required(),
        email:Joi.string().required().email(),
        phoneNumber:Joi.number().required(),
        address:Joi.string().required(),
        description:Joi.string(),
        partners:Joi.array(),
        boardMembers:Joi.array(),
        events:Joi.array(),
        reports:Joi.array()
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newUser = {

         id:uuid.v4(),
         type:'consultancyAgency',
         name,
         email,
         phoneNumber,
         address,
         description,
         partners:partners,
         boardMembers:boardMembers,
         events:events,
         reports:reports

    };
    Profiles.push(newUser);

	return res.json({ data: Profiles });

});

//partner
router.post('/partner', (req, res) => {

	const name = req.body.name
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const address=req.body.address;
    const description=req.body.description;
    const field=req.body.field;
    const partners=req.body.partners;
    const boardMembers=req.body.boardMembers;
    const events=req.body.events;
   
	const schema = {

		name: Joi.string().min(3).required(),
        email:Joi.string().required().email(),
        phoneNumber:Joi.number().required(),
        address:Joi.string().required(),
        description:Joi.string(),
        field:Joi.string(),
        partners:Joi.array(),
        boardMembers:Joi.array(),
        events:Joi.array()
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newUser = {

         id:uuid.v4(),
         type:'partner',
         name,
         email,
         phoneNumber,
         address,
         description,
         field,
         partners:partners,
         boardMembers:boardMembers,
         events:events

    };
    Profiles.push(newUser);

	return res.json({ data: Profiles });

});

//coworkingSpace
router.post('/coworkingSpace', (req, res) => {
   
	const name = req.body.name
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const address=req.body.address;
    const description=req.body.description;
    const facilities=req.body.facilities;
    const rooms=req.body.rooms;
   
	const schema = {

		name: Joi.string().min(3).required(),
        email:Joi.string().required().email(),
        phoneNumber:Joi.number().required(),
        address:Joi.string().required(),
        description:Joi.string(),
        facilities:Joi.array(),
        rooms:Joi.array()
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newUser = {

         id:uuid.v4(),
         type:'coworkingSpace',
         name,
         email,
         phoneNumber,
         address,
         description,
         facilities,
         rooms

    };
    Profiles.push(newUser);

	return res.json({ data: Profiles });

});

//educationalOrganization
router.post('/educationalOrganization', (req, res) => {
   
	const name = req.body.name
    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    const address=req.body.address;
    const description=req.body.description;
    const trainers=req.body.trainers;
    const trainingPrograms=req.body.trainingPrograms;
    const certificates=req.body.certificates;

	const schema = {

		name: Joi.string().min(3).required(),
        email:Joi.string().required().email(),
        phoneNumber:Joi.number().required(),
        address:Joi.string().required(),
        description:Joi.string(),
        trainers:Joi.array(),
        trainingPrograms:Joi.array(),
        certificates:Joi.array()
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newUser = {

         id:uuid.v4(),
         type:'educationalOrganization',
         name,
         email,
         phoneNumber,
         address,
         description,
         trainers,
         trainingPrograms,
         certificates

    };
    Profiles.push(newUser);

	return res.json({ data: Profiles });

});





module.exports = router;