// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const User = require('../../Models/UserModel');

// temporary data created as if it was pulled out of the database ...
var users = [
	new User('Barney', 30),
	new User('Lilly', 27),
	new User('Ted', 29),
	new User('Marshal', 27),
	new User('Robin', 28)
];

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all users
router.get('/', (req, res) => res.json({ data: users }));

//Get Specific User
router.get('/:id', (req, res) => {
	const found = users.some(user => user.id == (req.params.id));
  
	if (found) {
	  res.json(users.filter(user => user.id == (req.params.id)));
	} else {
	  res.status(404).json({ msg: `No user with the id of ${req.params.id}` });
	}
  });

// Create a new user
router.post('/', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!age) return res.status(400).send({ err: 'Age field is required' });
	if (typeof age !== 'number') return res.status(400).send({ err: 'Invalid value for age' });

	const newUser = {
		name,
		age,
		id: uuid.v4(),
	};
	users.push(newUser)
	return res.json({ data: newUser });
});


// Update User
router.put('/:id', (req, res) => {
	const found = users.some(user => user.id == (req.params.id));
  
	if (found) {
	  const updUser = req.body;
	  users.forEach(user => {
		if (user.id == (req.params.id)) {
		  user.name = updUser.name ? updUser.name : user.name;
		  user.age = updUser.age ? updUser.age : user.age;
  
		  res.json({ msg: 'User successfully updated', user });
		}
	  });
	} else {
	  res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
	}
  });


// Delete User
router.delete('/:id', (req, res) => {
	const found = users.some(user => user.id == (req.params.id));
  
	if (found) {
	  users=users.filter(user => user.id != (req.params.id))
	  res.json({
		msg: 'User successfully deleted',
		users }
	  );
	} else {
	  res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
	}
  });
  


/*router.post('/', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!age) return res.status(400).send({ err: 'Age field is required' });
	if (typeof age !== 'number') return res.status(400).send({ err: 'Invalid value for age' });

	const newUser = {
		name,
		age,
		id: uuid.v4(),
	};
	return res.json({ data: newUser });
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

	const newUser = {
		name,
		age,
		id: uuid.v4(),
	};
	return res.json({ data: newUser });
});*/

module.exports = router;