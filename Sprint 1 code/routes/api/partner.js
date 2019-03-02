// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const partner = require('../../Models/partnerM');
const PartnerCoworkingSpace = require('../../Models/Partner');

// temporary data created as if it was pulled out of the database ...
// temporary arbitary data created as if it was pulled out of the database ...
var partners = [
	new ConsultancyAgency('Barney', 'barney@hotmail.com',"Monib",'barney.com', 01234567,674387438,'Ahmed','sheko',"C","@barney"),
	new ConsultancyAgency('Lilly', 'lily@hotmail.com',"Giza",'Lilly.com', 01234567,3489348934,'Mohamed','Organs','Graduation',"O","@lilly"),
	new ConsultancyAgency('Ted', 'ted@hotmail.com',"Point90",'Ted.com', 01234567,8943893489,'Ali','Humans','CS4GameRoom',"N","@Ted"),
	new ConsultancyAgency('Marshal', 'marshal@hotmail.com',"Mohandseen","Marshal.com", 01234567,34983489,'Samya','Relaxing','Kol El Nas Bet2ol Yarab',"S","@Ted"),
	new ConsultancyAgency('Robin', 'robin@hotmail.com',"Agouza","Robin.com", 01234567,3489348989,'Farida','Being Happy','Concepts Food Logger in Prolog',"U","@Robin")

];

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all partners
router.get('/', (req, res) => res.json({ data: partners }));

// Create a new partner
router.post('/', (req, res) => {
	const name = req.body.name;
	const address = req.body.adress;
    const website = req.body.website;
    const fax = req.body.fax;
    const phoneNumber = req.body.phoneNumber;
    const partners = req.body.partners;
    const boardMembers = req.body.boardMembers;
    const about = req.body.about;
    const socialMediaAccounts = req.body.socialMediaAccounts;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!address) return res.status(400).send({ err: 'Address field is required' });
	if (typeof address !== 'string') return res.status(400).send({ err: 'Invalid value for address' });

	const newpartner = {
		name,
        address,
        website,
        fax,
        phoneNumber,
        partners,
        boardMembers,
        about,
        socialMediaAccounts,
		id: uuid.v4(),
	};
	partners.push(newpartner)
	return res.json({ data: newpartner });
});
router.put('/:id', (req, res) => {
	const found = partners.some(partner => partner.id == (req.params.id));
  
	if (found) {
	  const updpartner = req.body;
	  partners.forEach(partner => {
		if (partner.id == (req.params.id)) {
		  partner.name = updpartner.name ? updpartner.name : partner.name;
		  partner.partners = updpartner.partners ? updpartner.partners : partner.partners;
		  partner.email = updpartner.email ? updpartner.email : partner.email; 
		  partner.phoneNumber = updpartner.phoneNumber ? updpartner.phoneNumber : partner.phoneNumber;
          partner.website = updpartner.website ? updpartner.website : partner.website;
          partner.fax = updpartner.fax ? updpartner.fax : partner.fax;
          partner.boardMembers = updpartner.boardMembers ? updpartner.boardMembers : partner.boardMembers;
          partner.about = updpartner.about ? updpartner.about : partner.about;
          partner.socialMediaAccounts=updpartner.socialMediaAccounts ? updpartner.socialMediaAccounts : partner.socialMediaAccounts
		  res.json({ msg: 'partner successfully updated', partner });
		}
	  });
	} else {
	  res.status(400).json({ msg: 'No partner with the id of ${req.params.id}' });
	}
  });
  router.delete('/:id', (req, res) => {
	const found = partners.some(partner => partner.id == (req.params.id));
  
	if (found) {
	  partners=partners.filter(partner => partner.id != (req.params.id))
	  res.json({
		msg: 'partner successfully deleted',
		partners }
	  );
	} else {
	  res.status(400).json({ msg: 'No partner with the id of ${req.params.id}' });
	}
  });
/*router.post('/', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!age) return res.status(400).send({ err: 'Age field is required' });
	if (typeof age !== 'number') return res.status(400).send({ err: 'Invalid value for age' });

	const newpartner = {
		name,
		age,
		id: uuid.v4(),
	};
	return res.json({ data: newpartner });
});*/
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

	const newpartner = {
		name,
		age,
		id: uuid.v4(),
	};
	return res.json({ data: newpartner });
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
