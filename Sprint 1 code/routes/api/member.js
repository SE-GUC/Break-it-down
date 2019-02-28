// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Member = require('../../Models/Member');

// temporary arbitary data created as if it was pulled out of the database ...
var members = [
	new Member('Barney', 30,'barney@hotmail.com',345678934780, 01234567,'Judo','Graduating','Database1',"HighSchool"),
	new Member('Lilly', 27,'lily@hotmail.com',34563479347890, 01234567,'Karate','Passing','Database1',"Uni"),
	new Member('Ted', 29,'ted@hotmail.com',3456734890, 01234567,'Judo','Getting a Full Grade','CS4Game',"Uni"),
	new Member('Marshal', 27,'marshal@hotmail.com',3456754890, 01234567,'Karate','Relaxing','Database1',"HighSchool"),
	new Member('Robin', 28,'robin@hotmail.com',34567844390, 01234567,'Judo','Being Happy','Concepts Food Logger in Prolog',"Uni")

];

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all Members
router.get('/', (req, res) => res.json({ data: members }));

//Get Specific Member
router.get('/:id', (req, res) => {
	const found = members.some(member => member.id == (req.params.id));
  
	if (found) {
	  res.json(members.filter(member => member.id == (req.params.id)));
	} else {
	  res.status(404).json({ msg: `No member with the id of ${req.params.id}` });
	}
  });

// Create a new member
router.post('/', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	const email = req.body.email;
	const SSN = req.body.SSN;
	const phoneNumber = req.body.phoneNumber;
	const skills = req.body.skills;
	const interests = req.body.interests;
	const jobsCompleted=req.body.jobsCompleted;
	const certificates = req.body.certificates;
	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!age) return res.status(400).send({ err: 'Age field is required' });
	if (typeof age !== 'number') return res.status(400).send({ err: 'Invalid value for age' });
	if (!email) return res.status(400).send({ err: 'email field is required' });
	if (typeof email !== 'string') return res.status(400).send({ err: 'Invalid value for email' });
	if (!SSN) return res.status(400).send({ err: 'SSN field is required' });
	if (typeof SSN !== 'number') return res.status(400).send({ err: 'Invalid value for SSN' });
	if (!phoneNumber) return res.status(400).send({ err: 'phoneNumber field is required' });
	if (typeof phoneNumber !== 'number') return res.status(400).send({ err: 'Invalid value for phoneNumber' });

	//If Needed Later

	/*if (!skills) return res.status(400).send({ err: 'skills field is required' });
	if (typeof skills !== 'string') return res.status(400).send({ err: 'Invalid value for skills' });

	if (!interests) return res.status(400).send({ err: 'interests field is required' });
	if (typeof interests !== 'string') return res.status(400).send({ err: 'Invalid value for name' });

	if (!jobsCompleted) return res.status(400).send({ err: 'jobsCompleted field is required' });
	if (typeof jobsCompleted !== 'string') return res.status(400).send({ err: 'Invalid value for jobsCompleted' });

	if (!certificates) return res.status(400).send({ err: 'certificates field is required' });
	if (typeof certificates !== 'string') return res.status(400).send({ err: 'Invalid value for certificates' });
	
	*/

	const newMember = {
		name,
		age,
		email,
		SSN,
		phoneNumber,
		skills,
		interests,
		jobsCompleted,
		certificates,
		id: uuid.v4(),
	};
	
	members.push(newMember)
	return res.json({ data: newMember });
});


// Update member
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id == (req.params.id));
  
	if (found) {
	  const updMember = req.body;
	  members.forEach(member => {
		if (member.id == (req.params.id)) {
		  member.name = updMember.name ? updMember.name : member.name;
		  member.age = updMember.age ? updMember.age : member.age;
		  member.email = updMember.email ? updMember.email : member.email; 
		  member.SSN = updMember.SSN ? updMember.SSN : member.SSN;
		  member.phoneNumber = updMember.phoneNumber ? updMember.phoneNumber : member.phoneNumber;
		  member.skills = updMember.skills ? updMember.skills : member.skills;
		  member.interests = updMember.interests ? updMember.interests : member.interests;
		  member.jobsCompleted = updMember.jobsCompleted ? updMember.jobsCompleted : member.jobsCompleted;
		  member.certificates = updMember.certificates ? updMember.certificates : member.certificates;

		  res.json({ msg: 'Member successfully updated', member });
		}
	  });
	} else {
	  res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
  });


// Delete Member
router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id == (req.params.id));
  
	if (found) {
	  members=members.filter(member => member.id != (req.params.id))
	  res.json({
		msg: 'Member successfully deleted',
		members }
	  );
	} else {
	  res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
  });
  
//JOI later

/*
router.post('/joi', (req, res) => {
	const name = req.body.name
	const age = req.body.age

	const schema = {
		name: Joi.string().min(3).required(),
		age: Joi.number().required(),
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newMember = {
		name,
		age,
		id: uuid.v4(),
	};
	return res.json({ data: newMember });
});*/

module.exports = router;
