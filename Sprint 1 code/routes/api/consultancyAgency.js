// Dependencies
const express = require('express');
const Joi = require('joi');
const router = express.Router();

// Models
const ConsultancyAgency = require('../../models/ConsultancyAgency');
const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');
const RoomBookings = require('../../models/RoomBookings');


// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

router.get('/', async (req,res) => {
	const ConsultancyAgencys = await ConsultancyAgency.find()
	res.json({data: ConsultancyAgencys})
})



//Get Specific ConsultancyAgency (Malak&Nour) MONGOUPDATED
router.get('/:id', (req, res) => {
  ConsultancyAgency.findById(req.params.id)
		.then(consultancyAgency=> res.json(consultancyAgency))
		.catch(err=>res.status(404).json({ msg: 'No consultancyAgency with the id of ${req.params.id}'}))
});


// Create a new consultancyAgency (Malak&Nour) MONGOUPDATED
router.post('/', async(req, res) => {
const {type,name, birthday,email ,address ,phoneNumber ,partners,description, boardMembers,events ,reports,activation }=req.body
const consultancyAgency = await ConsultancyAgency.findOne({email})
if(consultancyAgency) return res.status(400).json({error: 'Email already exists'})

	const newConsultancyAgency = new ConsultancyAgency({
		name, 
		birthday,
		email,
		type,
		phoneNumber,
		address,
        partners,
        description,
		boardMembers,
		events,
		reports,
		activation,
	})
	newConsultancyAgency
	.save()
	.then(consultancyAgency => res.json({data :consultancyAgency}))
    .catch(err => res.json({error: 'Can not create consultancyAgency'}))
 //catch (error){
//console.log("can not create")}
});

// Update consultancyAgency (Malak&Nour) done except id non existent case
router.put('/:id', async (req,res) => {
	try {
	 const id = req.params.id
     const consultancyAgency = await ConsultancyAgency.findOne({id})
    // if(!consultancyAgency) return res.status(404).send({error: 'consultancyAgency does not exist'})
	// const isValidated = validator.updateValidation(req.body)
	 //if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     
     const updatedConsultancyAgency = await ConsultancyAgency.updateOne(req.body)

	 res.json({msg: 'consultancyAgency updated successfully'})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})


// Delete consultancyAgency (Malak&Nour) MONGOUPDATED
router.delete('/:id', async (req,res) => {
	try {
	 const id = req.params.id
	 const deletedConsultancyAgency = await ConsultancyAgency.findByIdAndRemove(id)
	 res.json({msg:'ConsultancyAgency was deleted successfully', data: deletedConsultancyAgency})
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

	const newConsultancyAgency = {
		name,
		website,
		id: uuid.v4(),
	};
	return res.json({ data: newConsultancyAgency });
});*/


//shaza
//get the coworking space by id
router.get('/PartnerCoworkingspaces/:id',(req,res)=>{
	const PartnerCoworkingspaces=PartnerCoworkingSpace.find(c=>c.id===parseInt(req.params.id));
	if(!PartnerCoworkingspaces) return res.status(404).send('coworkingspace not found');
	res.send(PartnerCoworkingspaces);
});

//view all coworking spaces
router.get('/PartnerCoworkingspaces',(req,res)=>{
	res.send(PartnerCoworkingSpace);
}); 

//nourhan
//Get all bookings of a specific user
router.get('/RoomBookings/:userID' ,(req, res)=>{
	var RB = RoomBookings.find(p => p.userID === parseInt(req.params.userID));
    if(!RB){
        res.status(404).send('This user has no bookings');

    }
    res.send(RB.bookings);
});

//get a room in a specific coworking space by id
router.get('/cospace/:id/rooms/:id2' ,(req, res)=>{
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
router.delete('/RoomBookings/:userID/:bookingID', (req, res) => {
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
