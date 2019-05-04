//------------express-------------
const express = require('express');
const router = express.Router();

//-------------Models---------------
const Event = require('../../models/EventModel');

const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys").secretOrKey;
var store = require("store");

//-------------Get all events MONGOUPDATED------------------
router.get('/', (req, res) => {
	Event.find()
		.then(items=>res.json(items))
});
//-------------Get all MY events MONGOUPDATED------------------
router.get('/Mine', (req, res) => {
		jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
			if (err) {
				//If error send Forbidden (403)
				console.log("ERROR: Could not connect to the protected route");
				res.sendStatus(403);
			} else {
				Event.find({userID:authorizedData.id})
				.then(items=>res.json(items))			}
		});
	});


//---------------------Get Specific event MONGOUPDATED--------------
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
		.then(event=> res.json(event))
		.catch(err=>res.status(404).json({ msg: 'No event with the id of ${req.params.id}'}))
  });

//-------------------Create a new event MONGOUPDATED------------------
router.post('/', async(req, res) => {
	jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
		if (err) {
			//If error send Forbidden (403)
			console.log("ERROR: Could not connect to the protected route");
			res.sendStatus(403);
		} else {

			const newEvent= new Event({
				userID: authorizedData.id,
				name: req.body.name,
				description: req.body.description,
				date: req.body.date,
				location: req.body.location,
				time: req.body.time
				
		 });
		 
	 
		 if (!newEvent.name) return res.status(400).send({ err: 'Name field is required' });
			 if (typeof newEvent.name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
			 
	 
		 if (newEvent.description) {
			 if (typeof newEvent.description !== 'string') return res.status(400).send({ err: 'Invalid value for description' });
		 }
	 
	 
		 if (!newEvent.date) return res.status(400).send({ err: 'Date field is required' });
			 
		 if (!newEvent.location) return res.status(400).send({ err: 'Location field is required' });
			 if (typeof newEvent.location !== 'string') return res.status(400).send({ err: 'Invalid value for location' });
	 
		 console.log(newEvent)
		 newEvent.save()
						 .then(items=>res.json(items))
					 //	.catch(err => res.status(400).json({msg:"Required Field is Missing, Required Fields are: name , date, location."}))
	 

			}
	});
	
});


//-------------------Update event MONGOUPDATED--------------
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
	


//-------------------Delete event MONGOUPDATED---------------
router.delete('/:id', (req, res) => {
	Event.findById(req.params.id)
		.then(event=> event.remove().then(()=> res.json({Msg: "Event Successfully Deleted"})))
		.catch(err=>res.status(404).json({ msg: 'No event with the id of ${req.params.id}'}))
});

		

  



module.exports = router;
