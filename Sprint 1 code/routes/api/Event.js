// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();


// Models
const Event = require('../../Models/EventModel');

/*// temporary arbitary data created as if it was pulled out of the database ...
var events = [
	new Event('Orientation','New Dash', "2020-10-03",'GUC'),
	new Event('Graduation','Bye Dash', "2020-11-03",'GUC'),
	new Event('Employement Fair', 'Jobs',"2022-03-13",'GUC'),
	new Event('Photo Day', 'Instagram',"2021-10-16",'GUC'),

];*/

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all events MONGOUPDATED
router.get('/', (req, res) => {
	Event.find()
		.then(items=>res.json(items))
});

//Get Specific event MONGOUPDATED
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
		.then(event=> res.json(event))
		.catch(err=>res.status(404).json({ msg: 'No event with the id of ${req.params.id}'}))
  });

// Create a new event MONGOUPDATED
router.post('/', async(req, res) => {
	const newEvent= new Event({
		 name: req.body.name,
		 description: req.body.description,
		 date: req.body.date,
		 location: req.body.location
		 
	});
	

	if (!newEvent.name) return res.status(400).send({ err: 'Name field is required' });
    if (typeof newEvent.name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
    

	if (newEvent.description) {
    if (typeof newEvent.description !== 'string') return res.status(400).send({ err: 'Invalid value for description' });
	}


	if (!newEvent.date) return res.status(400).send({ err: 'Date field is required' });
    if (typeof newEvent.date !== 'string') return res.status(400).send({ err: 'Invalid value for date' });
    
	if (!newEvent.location) return res.status(400).send({ err: 'Location field is required' });
		if (typeof newEvent.location !== 'string') return res.status(400).send({ err: 'Invalid value for location' });


	newEvent.save()
					.then(items=>res.json(items))
				//	.catch(err => res.status(400).json({msg:"Required Field is Missing, Required Fields are: name , date, location."}))

});


// Update event MONGOUPDATED
router.put('/:id', (req, res) => {
	const updevent = req.body;
  Event.findById(req.params.id)
		.then(event=> {
			event.name = updevent.name ? updevent.name : event.name;
		  event.description = updevent.description ? updevent.description : event.description;
		  event.date = updevent.date ? updevent.date : event.date; 
			event.location = updevent.location ? updevent.location : event.location;
			event.save().then(res.json({ msg: 'Event successfully updated', event }));
		} )
		.catch(err=>res.status(404).json({ msg: 'No event with the id of ${req.params.id}'}))
  });  
	


// Delete event MONGOUPDATED
router.delete('/:id', (req, res) => {
	Event.findById(req.params.id)
		.then(event=> event.remove().then(()=> res.json({Msg: "Event Successfully Deleted"})))
		.catch(err=>res.status(404).json({ msg: 'No event with the id of ${req.params.id}'}))
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
