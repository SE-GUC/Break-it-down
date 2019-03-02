// Dependencies

/*An educational organizationʼs profile should hold their basic information, 
the courses they offer, their trainers/educators, the certificates they supply and their training programs*/
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const PartnerCoworkingSpace = require('../../Models/Partner');
// Models
const EducationalOrganisation = require('../../Models/EducationalOrganisation');

// temporary arbitary data created as if it was pulled out of the database ...
var educationalOrganisations = [
	new EducationalOrganisation('NES', 'NES.com','barney@hotmail.com',"Monib", 01234567,674387438,'Ahmed','Dice Probability','Orientation',"C"),
	new EducationalOrganisation('KES', 'KES.com','lily@hotmail.com',"Giza", 01234567,3489348934,'Mohamed','Organs','Graduation',"O"),
	new EducationalOrganisation('TEA', 'TEA.com','ted@hotmail.com',"Point90", 01234567,8943893489,'Ali','Humans','CS4GameRoom',"N"),
	new EducationalOrganisation('Dale Carnegie', "carnegie.com",'marshal@hotmail.com',"Mohandseen", 01234567,34983489,'Samya','Relaxing','Kol El Nas Bet2ol Yarab',"S"),
	new EducationalOrganisation('Butterfly', "Butterfly.com",'robin@hotmail.com',"Agouza", 01234567,3489348989,'Farida','Being Happy','Concepts Food Logger in Prolog',"U")

];

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all EducationalOrganisations
router.get('/', (req, res) => res.json({ data: educationalOrganisations }));

//Get Specific EducationalOrganisation
router.get('/:id', (req, res) => {
	const found = educationalOrganisations.some(educationalOrganisation => educationalOrganisation.id == (req.params.id));
  
	if (found) {
	  res.json(educationalOrganisations.filter(educationalOrganisation => educationalOrganisation.id == (req.params.id)));
	} else {
	  res.status(404).json({ msg: `No Educational Organisation with the id of ${req.params.id}` });
	}
  });

// Create a new educationalOrganisation
router.post('/', (req, res) => {
	const name = req.body.name;
	const website = req.body.website;
	const email = req.body.email;
	const address = req.body.address;
	const phoneNumber = req.body.phoneNumber;
	const fax = req.body.fax;
	const trainers = req.body.trainers;
	const coursesOffered=req.body.coursesOffered;
	const certificatesSupplied = req.body.certificatesSupplied;
	const trainingPrograms = req.body.trainingPrograms;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!website) return res.status(400).send({ err: 'Website field is required' });
	if (typeof website !== 'string') return res.status(400).send({ err: 'Invalid value for website' });
	if (!email) return res.status(400).send({ err: 'email field is required' });
	if (typeof email !== 'string') return res.status(400).send({ err: 'Invalid value for email' });
	if (!address) return res.status(400).send({ err: 'address field is required' });
	if (typeof address !== 'string') return res.status(400).send({ err: 'Invalid value for address' });
	if (!phoneNumber) return res.status(400).send({ err: 'phoneNumber field is required' });
	if (typeof phoneNumber !== 'number') return res.status(400).send({ err: 'Invalid value for phoneNumber' });

	//If Needed Later

	/*if (!fax) return res.status(400).send({ err: 'fax field is required' });
	if (typeof fax !== 'string') return res.status(400).send({ err: 'Invalid value for fax' });

	if (!trainers) return res.status(400).send({ err: 'trainers field is required' });
	if (typeof trainers !== 'string') return res.status(400).send({ err: 'Invalid value for trainers' });

	if (!coursesOffered) return res.status(400).send({ err: 'coursesOffered field is required' });
	if (typeof coursesOffered !== 'string') return res.status(400).send({ err: 'Invalid value for coursesOffered' });

	if (!certificatesSupplied) return res.status(400).send({ err: 'certificatesSupplied field is required' });
	if (typeof certificatesSupplied !== 'string') return res.status(400).send({ err: 'Invalid value for certificatesSupplied' });

	if (!trainingPrograms) return res.status(400).send({ err: 'trainingPrograms field is required' });
	if (typeof trainingPrograms !== 'string') return res.status(400).send({ err: 'Invalid value for trainingPrograms' });

	
	*/

	const newEducationalOrganisation = {
		name,
		website,
		email,
		address,
		phoneNumber,
		fax,
		trainers,
		coursesOffered,
		certificatesSupplied,
		trainingPrograms,
		id: uuid.v4(),
	};

	educationalOrganisations.push(newEducationalOrganisation)
	return res.json({ data: newEducationalOrganisation });
});


// Update educationalOrganisation
router.put('/:id', (req, res) => {
	const found = educationalOrganisations.some(educationalOrganisation => educationalOrganisation.id == (req.params.id));
  
	if (found) {
	  const updEducationalOrganisation = req.body;
	  educationalOrganisations.forEach(educationalOrganisation => {
		if (educationalOrganisation.id == (req.params.id)) {
		  educationalOrganisation.name = updEducationalOrganisation.name ? updEducationalOrganisation.name : educationalOrganisation.name;
		  educationalOrganisation.website = updEducationalOrganisation.website ? updEducationalOrganisation.website : educationalOrganisation.website;
		  educationalOrganisation.email = updEducationalOrganisation.email ? updEducationalOrganisation.email : educationalOrganisation.email; 
		  educationalOrganisation.address = updEducationalOrganisation.address ? updEducationalOrganisation.address : educationalOrganisation.address;
		  educationalOrganisation.phoneNumber = updEducationalOrganisation.phoneNumber ? updEducationalOrganisation.phoneNumber : educationalOrganisation.phoneNumber;
		  educationalOrganisation.fax = updEducationalOrganisation.fax ? updEducationalOrganisation.fax : educationalOrganisation.fax;
		  educationalOrganisation.trainers = updEducationalOrganisation.trainers ? updEducationalOrganisation.trainers : educationalOrganisation.trainers;
		  educationalOrganisation.coursesOffered = updEducationalOrganisation.coursesOffered ? updEducationalOrganisation.coursesOffered : educationalOrganisation.coursesOffered;
		  educationalOrganisation.certificatesSupplied = updEducationalOrganisation.certificatesSupplied ? updEducationalOrganisation.certificatesSupplied : educationalOrganisation.certificatesSupplied;
		  educationalOrganisation.trainingPrograms = updEducationalOrganisation.trainingPrograms ? updEducationalOrganisation.trainingPrograms : educationalOrganisation.trainingPrograms;

		  res.json({ msg: 'Educational Organisation successfully updated', educationalOrganisation });
		}
	  });
	} else {
	  res.status(400).json({ msg: `No Educational Organisation with the id of ${req.params.id}` });
	}
  });


// Delete EducationalOrganisation
router.delete('/:id', (req, res) => {
	const found = educationalOrganisations.some(educationalOrganisation => educationalOrganisation.id == (req.params.id));
  
	if (found) {
	  educationalOrganisations=educationalOrganisations.filter(educationalOrganisation => educationalOrganisation.id != (req.params.id))
	  res.json({
		msg: 'Educational Organisation successfully deleted',
		educationalOrganisations }
	  );
	} else {
	  res.status(400).json({ msg: `No Educational Organisation with the id of ${req.params.id}` });
	}
  });
  
//JOI later

/*
router.post('/joi', (req, res) => {
	const name = req.body.name
	const website = req.body.website

	const schema = {
		name: Joi.string().min(3).required(),
		website: Joi.number().required(),
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].messwebsite });

	const newEducationalOrganisation = {
		name,
		website,
		id: uuid.v4(),
	};
	return res.json({ data: newEducationalOrganisation });
});*/

//shaza
//get the coworking space by id
app.get('/api/PartnerCoworkingspaces/:id',(req,res)=>{
	const PartnerCoworkingspaces=PartnerCoworkingSpace.find(c=>c.id===parseInt(req.params.id));
	if(!PartnerCoworkingspaces) return res.status(404).send('coworkingspace not found');
	res.send(PartnerCoworkingspaces);
});

//view all coworking spaces
app.get('/api/PartnerCoworkingspaces',(req,res)=>{
	res.send(PartnerCoworkingSpace);
}); 
module.exports = router;
