// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Event = require('../../Models/EventModel');

// temporary arbitary data created as if it was pulled out of the database ...
var events = [
	new Event('Orientation','New Dash', "2020-10-03",'GUC'),
	new Event('Graduation','Bye Dash', "2020-11-03",'GUC'),
	new Event('Employement Fair', 'Jobs',"2022-03-13",'GUC'),
	new Event('Photo Day', 'Instagram',"2021-10-16",'GUC'),

];

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all events
router.get('/Events/', (req, res) => res.json({ data: events }));

//Get Specific event
router.get('/Events/:id', (req, res) => {
	const found = events.some(event => event.id == (req.params.id));
  
	if (found) {
	  res.json(events.filter(event => event.id == (req.params.id)));
	} else {
	  res.status(404).json({ msg: 'No event with the id of ${req.params.id} '});
	}
  });

// Create a new event
router.post('/Events', (req, res) => {
	const name = req.body.name;
	const description = req.body.description;
    const date = req.body.date;
    const location = req.body.location;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
    if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
    

	if (!description) return res.status(400).send({ err: 'Description field is required' });
    if (typeof description !== 'string') return res.status(400).send({ err: 'Invalid value for description' });
    
	if (!date) return res.status(400).send({ err: 'Date field is required' });
    if (typeof date !== 'string') return res.status(400).send({ err: 'Invalid value for date' });
    
	if (!location) return res.status(400).send({ err: 'Location field is required' });
	if (typeof location !== 'string') return res.status(400).send({ err: 'Invalid value for location' });



	const newevent = {
		name,
		description,
		date,
		location,
	};

	events.push(newevent)
	return res.json({ data: newevent });
});


// Update event
router.put('/Events/:id', (req, res) => {
	const found = events.some(event => event.id == (req.params.id));
  
	if (found) {
	  const updevent = req.body;
	  events.forEach(event => {
		if (event.id == (req.params.id)) {
		  event.name = updevent.name ? updevent.name : event.name;
		  event.age = updevent.age ? updevent.age : event.age;
		  event.email = updevent.email ? updevent.email : event.email; 
		  event.phoneNumber = updevent.phoneNumber ? updevent.phoneNumber : event.phoneNumber;

		  res.json({ msg: 'event successfully updated', event });
		}
	  });
	} else {
	  res.status(400).json({ msg: 'No event with the id of ${req.params.id}' });
	}
  });


// Delete event
router.delete('/Events/:id', (req, res) => {
	const found = events.some(event => event.id == (req.params.id));
  
	if (found) {
	  events=events.filter(event => event.id != (req.params.id))
	  res.json({
		msg: 'event successfully deleted',
		events }
	  );
	} else {
	  res.status(400).json({ msg: 'No event with the id of ${req.params.id}' });
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

	const newevent = {
		name,
		age,
		id: uuid.v4(),
	};
	return res.json({ data: newevent });
});*/

module.exports = router;
