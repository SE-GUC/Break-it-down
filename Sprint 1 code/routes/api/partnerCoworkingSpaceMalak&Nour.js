// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const PartnerCoworkingSpace = require('../../Models/PartnerCoworkingSpaceModel');

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all PartnerCoworkingSpaces
router.get('/', (req, res) => res.json({ data: PartnerCoworkingSpaces }));

// Create a new PartnerCoworkingSpace
router.post('/', (req, res) => {
	const name = req.body.name;
	const address = req.body.adress;
    const website = req.body.website;
    const fax = req.body.fax;
    const phoneNumber = req.body.phoneNumber;
    const facilities = req.body.facilities;
    const room1 = req.body.room1;
    const room2 = req.body.room2;
    const room3 = req.body.room3;
    const reservationsAvailability = req.body.reservationsAvailability;
    const about = req.body.about;
    const socialMediaAccounts = req.body.socialMediaAccounts;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!address) return res.status(400).send({ err: 'Address field is required' });
	if (typeof address !== 'string') return res.status(400).send({ err: 'Invalid value for address' });

	const newPartnerCoworkingSpace = {
		name,
        address,
        website,
        fax,
        phoneNumber,
        facilities,
        room1,
        room2,
        room3,
        reservationsAvailability,
        about,
        socialMediaAccounts,
		id: uuid.v4(),
	};
	PartnerCoworkingSpaces.push(newPartnerCoworkingSpace)
	return res.json({ data: newPartnerCoworkingSpace });
});
router.put('/:id', (req, res) => {
	const found = PartnerCoworkingSpaces.some(PartnerCoworkingSpace => PartnerCoworkingSpace.id == (req.params.id));
  
	if (found) {
	  const updPartnerCoworkingSpace = req.body;
	  PartnerCoworkingSpaces.forEach(PartnerCoworkingSpace => {
		if (PartnerCoworkingSpace.id == (req.params.id)) {
		  PartnerCoworkingSpace.name = updPartnerCoworkingSpace.name ? updPartnerCoworkingSpace.name : PartnerCoworkingSpace.name;
          PartnerCoworkingSpace.room1 = updPartnerCoworkingSpace.room1 ? updPartnerCoworkingSpace.room1 : PartnerCoworkingSpace.room1;
          PartnerCoworkingSpace.room2 = updPartnerCoworkingSpace.room2 ? updPartnerCoworkingSpace.room2 : PartnerCoworkingSpace.room2;
          PartnerCoworkingSpace.room3 = updPartnerCoworkingSpace.room3 ? updPartnerCoworkingSpace.room3 : PartnerCoworkingSpace.room3;
		  PartnerCoworkingSpace.email = updPartnerCoworkingSpace.email ? updPartnerCoworkingSpace.email : PartnerCoworkingSpace.email; 
		  PartnerCoworkingSpace.phoneNumber = updPartnerCoworkingSpace.phoneNumber ? updPartnerCoworkingSpace.phoneNumber : PartnerCoworkingSpace.phoneNumber;
          PartnerCoworkingSpace.website = updPartnerCoworkingSpace.website ? updPartnerCoworkingSpace.website : PartnerCoworkingSpace.website;
          PartnerCoworkingSpace.fax = updPartnerCoworkingSpace.fax ? updPartnerCoworkingSpace.fax : PartnerCoworkingSpace.fax;
          PartnerCoworkingSpace.facilities = updPartnerCoworkingSpace.facilities ? updPartnerCoworkingSpace.facilities : PartnerCoworkingSpace.facilities;
          PartnerCoworkingSpace.reservationsAvailability = updPartnerCoworkingSpace.reservationsAvailability ? updPartnerCoworkingSpace.reservationsAvailability : PartnerCoworkingSpace.reservationsAvailability;
          PartnerCoworkingSpace.about = updPartnerCoworkingSpace.about ? updPartnerCoworkingSpace.about : PartnerCoworkingSpace.about;
          PartnerCoworkingSpace.socialMediaAccounts=updPartnerCoworkingSpace.socialMediaAccounts ? updPartnerCoworkingSpace.socialMediaAccounts : PartnerCoworkingSpace.socialMediaAccounts
		  res.json({ msg: 'PartnerCoworkingSpace successfully updated', PartnerCoworkingSpace });
		}
	  });
	} else {
	  res.status(400).json({ msg: 'No PartnerCoworkingSpace with the id of ${req.params.id}' });
	}
  });
  router.delete('/:id', (req, res) => {
	const found = PartnerCoworkingSpaces.some(PartnerCoworkingSpace => PartnerCoworkingSpace.id == (req.params.id));
  
	if (found) {
	  PartnerCoworkingSpaces=PartnerCoworkingSpaces.filter(PartnerCoworkingSpace => PartnerCoworkingSpace.id != (req.params.id))
	  res.json({
		msg: 'PartnerCoworkingSpace successfully deleted',
		PartnerCoworkingSpaces }
	  );
	} else {
	  res.status(400).json({ msg: 'No PartnerCoworkingSpace with the id of ${req.params.id}' });
	}
  });


module.exports = router;
