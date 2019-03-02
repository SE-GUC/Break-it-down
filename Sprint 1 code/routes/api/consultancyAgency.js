// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const ConsultancyAgency = require('../../Models/ConsultancyAgency');

// temporary arbitary data created as if it was pulled out of the database ...
var consultancyAgencys = [
	new ConsultancyAgency('Barney', 'barney.com','barney@hotmail.com',"Monib", 01234567,674387438,'Ahmed','Dice Probability','Orientation',"C","@barney"),
	new ConsultancyAgency('Lilly', 'Lilly.com','lily@hotmail.com',"Giza", 01234567,3489348934,'Mohamed','Organs','Graduation',"O","@lilly"),
	new ConsultancyAgency('Ted', 'Ted.com','ted@hotmail.com',"Point90", 01234567,8943893489,'Ali','Humans','CS4GameRoom',"N","@Ted"),
	new ConsultancyAgency('Marshal', "Marshal.com",'marshal@hotmail.com',"Mohandseen", 01234567,34983489,'Samya','Relaxing','Kol El Nas Bet2ol Yarab',"S","@Ted"),
	new ConsultancyAgency('Robin', "Robin.com",'robin@hotmail.com',"Agouza", 01234567,3489348989,'Farida','Being Happy','Concepts Food Logger in Prolog',"U","@Robin")

];

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

// Get all ConsultancyAgencys
router.get('/', (req, res) => res.json({ data: consultancyAgencys }));

//Get Specific ConsultancyAgency
router.get('/:id', (req, res) => {
	const found = consultancyAgencys.some(consultancyAgency => consultancyAgency.id == (req.params.id));
  
	if (found) {
	  res.json(consultancyAgencys.filter(consultancyAgency => consultancyAgency.id == (req.params.id)));
	} else {
	  res.status(404).json({ msg: `No Consultancy Agency with the id of ${req.params.id}` });
	}
  });

// Create a new consultancyAgency
router.post('/', (req, res) => {
	const name = req.body.name;
	const website = req.body.website;
	const email = req.body.email;
	const address = req.body.address;
	const phoneNumber = req.body.phoneNumber;
	const fax = req.body.fax;
	const boardMembers = req.body.boardMembers;
	const studiesPosted=req.body.studiesPosted;
	const eventsOrganized = req.body.eventsOrganized;
	const about = req.body.about;
	const socialMediaAccounts = req.body.socialMediaAccounts;

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

	if (!boardMembers) return res.status(400).send({ err: 'boardMembers field is required' });
	if (typeof boardMembers !== 'string') return res.status(400).send({ err: 'Invalid value for boardMembers' });

	if (!studiesPosted) return res.status(400).send({ err: 'studiesPosted field is required' });
	if (typeof studiesPosted !== 'string') return res.status(400).send({ err: 'Invalid value for studiesPosted' });

	if (!eventsOrganized) return res.status(400).send({ err: 'eventsOrganized field is required' });
	if (typeof eventsOrganized !== 'string') return res.status(400).send({ err: 'Invalid value for eventsOrganized' });

	if (!about) return res.status(400).send({ err: 'about field is required' });
	if (typeof about !== 'string') return res.status(400).send({ err: 'Invalid value for about' });

	if (!socialMediaAccounts) return res.status(400).send({ err: 'socialMediaAccounts field is required' });
	if (typeof socialMediaAccounts !== 'string') return res.status(400).send({ err: 'Invalid value for socialMediaAccounts' });
	
	*/

	const newConsultancyAgency = {
		name,
		website,
		email,
		address,
		phoneNumber,
		fax,
		boardMembers,
		studiesPosted,
		eventsOrganized,
		about,
		socialMediaAccounts,
		id: uuid.v4(),
	};

	consultancyAgencys.push(newConsultancyAgency)
	return res.json({ data: newConsultancyAgency });
});


// Update consultancyAgency
router.put('/:id', (req, res) => {
	const found = consultancyAgencys.some(consultancyAgency => consultancyAgency.id == (req.params.id));
  
	if (found) {
	  const updConsultancyAgency = req.body;
	  consultancyAgencys.forEach(consultancyAgency => {
		if (consultancyAgency.id == (req.params.id)) {
		  consultancyAgency.name = updConsultancyAgency.name ? updConsultancyAgency.name : consultancyAgency.name;
		  consultancyAgency.website = updConsultancyAgency.website ? updConsultancyAgency.website : consultancyAgency.website;
		  consultancyAgency.email = updConsultancyAgency.email ? updConsultancyAgency.email : consultancyAgency.email; 
		  consultancyAgency.address = updConsultancyAgency.address ? updConsultancyAgency.address : consultancyAgency.address;
		  consultancyAgency.phoneNumber = updConsultancyAgency.phoneNumber ? updConsultancyAgency.phoneNumber : consultancyAgency.phoneNumber;
		  consultancyAgency.fax = updConsultancyAgency.fax ? updConsultancyAgency.fax : consultancyAgency.fax;
		  consultancyAgency.boardMembers = updConsultancyAgency.boardMembers ? updConsultancyAgency.boardMembers : consultancyAgency.boardMembers;
		  consultancyAgency.studiesPosted = updConsultancyAgency.studiesPosted ? updConsultancyAgency.studiesPosted : consultancyAgency.studiesPosted;
		  consultancyAgency.eventsOrganized = updConsultancyAgency.eventsOrganized ? updConsultancyAgency.eventsOrganized : consultancyAgency.eventsOrganized;
		  consultancyAgency.about = updConsultancyAgency.about ? updConsultancyAgency.about : consultancyAgency.about;
		  consultancyAgency.socialMediaAccounts = updConsultancyAgency.socialMediaAccounts ? updConsultancyAgency.socialMediaAccounts : consultancyAgency.socialMediaAccounts;

		  res.json({ msg: 'Consultancy Agency successfully updated', consultancyAgency });
		}
	  });
	} else {
	  res.status(400).json({ msg: `No Consultancy Agency with the id of ${req.params.id}` });
	}
  });


// Delete ConsultancyAgency
router.delete('/:id', (req, res) => {
	const found = consultancyAgencys.some(consultancyAgency => consultancyAgency.id == (req.params.id));
  
	if (found) {
	  consultancyAgencys=consultancyAgencys.filter(consultancyAgency => consultancyAgency.id != (req.params.id))
	  res.json({
		msg: 'Consultancy Agency successfully deleted',
		consultancyAgencys }
	  );
	} else {
	  res.status(400).json({ msg: `No Consultancy Agency with the id of ${req.params.id}` });
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

	const newConsultancyAgency = {
		name,
		website,
		id: uuid.v4(),
	};
	return res.json({ data: newConsultancyAgency });
});*/


//nourhan
//Get all bookings of a specific user
router.get('/api/RoomBookings/:userID' ,(req, res)=>{
	var RB = RoomBookings.find(p => p.userID === parseInt(req.params.userID));
    if(!RB){
        res.status(404).send('This user has no bookings');

    }
    res.send(RB.bookings);
});

//get a room in a specific coworking space by id
router.get('/api/cospace/:id/rooms/:id2' ,(req, res)=>{
    var scheduleroom = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id === parseInt(req.params.id2));
    if(!scheduleroom){
        res.status(404).send('The room with the given id is not found');
        return;
    }
    res.send(scheduleroom.schedule);
});

//book a room , append it to the array of bookings if it is not in my bookings
router.put('/api/cospace/:userid/:id/rooms/:id2/:id3' ,(req, res)=>{
    let scheduleroom = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id === parseInt(req.params.id2));
    if(!scheduleroom){
        res.status(404).send('The room with the given id is not found');
        return;
    };
    const scheduleOfRoom = scheduleroom.schedule;

    const schema = {
        reserved: Joi.boolean()
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message)
    }

    let h = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id 
        === parseInt(req.params.id2)).schedule.find(r =>r.id === parseInt(req.params.id3));
     let h2 = RoomBookings.find(l2 => l2.userID === parseInt(req.params.userid));

     for(var i = 0;i<h2.bookings.length;i++){
         if(parseInt(req.params.id3) === parseInt(h2.bookings[i].scheduleID) && parseInt(req.params.id2) === parseInt(h2.bookings[i].roomID)){
             res.status(400).send('already reserved');
             return;
         }
        }
     //if(h.id === parseInt())
     const temp = {
        bookingID:h2.bookings.length+1 ,
        coworkingSpaceID:parseInt(req.params.id),
        roomID:parseInt(req.params.id2),
        scheduleID : h.id,
        Date : h.Date,
        time: h.time
    };
    h2.bookings.push(temp);
    var reservation = scheduleOfRoom.find(i => i.id === parseInt(req.params.id3));
    if(reservation.reserved === true){
        res.send('A reserver room');
        return;
    }
    reservation.reserved = req.body.reserved;
    res.send(RoomBookings);
});


//delete booking and set the reservation boolean to false so others can now book it
router.delete('/api/RoomBookings/:userID/:bookingID', (req, res) => {
    const temp = RoomBookings.find(c => c.userID === parseInt(req.params.userID));
    const book = temp.bookings;
    const temp2 = book.find(r => r.bookingID === parseInt(req.params.bookingID));

    if(!temp2){
        res.status(404).send('The room with the given id is not found');
        return;
    };
    let h = PartnerCoworkingSpace.find(p => p.id === parseInt(temp2.coworkingSpaceID)).rooms.find(s => s.id 
        === parseInt(temp2.roomID)).schedule.find(r =>r.id === parseInt(temp2.scheduleID));
    h.reserved = false;
    const index = book.indexOf(temp2);

    book.splice(index,1)

    res.send(RoomBookings)
});

module.exports = router;
