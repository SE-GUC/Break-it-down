// Dependencies

/*An educational organizationʼs profile should hold their basic information, 
the courses they offer, their trainers/educators, the certificates they supply and their training programs*/
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
//const PartnerCoworkingSpace = require('../../Models/PartnerCoworkingSpace');
// Models
const EducationalOrganisation = require('../../Models/EducationalOrganisation');


// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all EducationalOrganisations MONGOUPDATED
router.get('/', async (req,res) => {
	const educationalOrganisation = await EducationalOrganisation.find()
	res.json({data: educationalOrganisation})
})
//Get Specific EducationalOrganisation MONGOUPDATED
router.get('/:id', (req, res) => {
  EducationalOrganisation.findById(req.params.id)
		.then(educationalOrganisation=> res.json(educationalOrganisation))
		.catch(err=>res.status(404).json({ msg: 'No EducationalOrganisation with the id of ${req.params.id}'}))
});

// Create a new EducationalOrganisation (Malak&Nour) MONGOUPDATED
router.post('/', async(req, res) => {
	const {type,name,email ,address ,phoneNumber ,description,trainers,trainingPrograms,certificates }=req.body
	const educationalOrganisation = await EducationalOrganisation.findOne({email})
	if(educationalOrganisation) return res.status(400).json({error: 'Email already exists'})
	
		const newEducationalOrganisation = new EducationalOrganisation({
			name,
			email,
			type,
			phoneNumber,
			address,
			description,
			trainers,
			trainingPrograms,
			certificates
		})
		newEducationalOrganisation
		.save()
		.then(educationalOrganisation => res.json({data :educationalOrganisation}))
			.catch(err => res.json({error: 'Can not create EducationalOrganisation'}))
	 //catch (error){
	//console.log("can not create")}
	});

// Update EducationalOrganisation (Malak&Nour) done except id non existent case
router.put('/:id', async (req,res) => {
	try {
	 const id = req.params.id
     const educationalOrganisation = await EducationalOrganisation.findOne({id})
    // if(!educationalOrganisation) return res.status(404).send({error: 'EducationalOrganisation does not exist'})
	// const isValidated = validator.updateValidation(req.body)
	 //if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     
     const updatedEducationalOrganisation = await EducationalOrganisation.updateOne(req.body)

	 res.json({msg: 'EducationalOrganisation updated successfully'})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})


// Delete EducationalOrganisation (Malak&Nour) MONGOUPDATED
router.delete('/:id', async (req,res) => {
	try {
	 const id = req.params.id
	 const deletedEducationalOrganisation = await EducationalOrganisation.findByIdAndRemove(id)
	 res.json({msg:'EducationalOrganisation was deleted successfully', data: deletedEducationalOrganisation})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})
  
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
router.get('/api/PartnerCoworkingspaces/:id',(req,res)=>{
	const PartnerCoworkingspaces=PartnerCoworkingSpace.find(c=>c.id===parseInt(req.params.id));
	if(!PartnerCoworkingspaces) return res.status(404).send('coworkingspace not found');
	res.send(PartnerCoworkingspaces);
});

//view all coworking spaces
router.get('/api/PartnerCoworkingspaces',(req,res)=>{
	res.send(PartnerCoworkingSpace);
}); 
module.exports = router;
