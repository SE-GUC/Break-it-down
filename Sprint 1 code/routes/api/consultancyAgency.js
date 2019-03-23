// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models

const PartnerCoworkingSpace = require('../../Models/Partner');

//nourhan
const User = require('../../models/UserProfile');
 var mongoose = require('mongoose');
 var objectid = require('mongodb').ObjectID


const ConsultancyAgency = require('../../models/ConsultancyAgency');
//const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');
const RoomBookings = require('../../models/RoomBookings');
const Message = require('../../models/messages');




//nourhan
const user = require('../../models/UserProfile');
 var mongoose = require('mongoose');
 var objectid = require('mongodb').ObjectID

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
//shaza
//get the coworking space by id
router.get('/PartnerCoworkingspaces/:id',async (req,res) =>{

	const Users =await User.find({type:'coworkingspace',userID:parseInt(req.params.id)})
	if(!Users) return res.json('Coworking space does not exist')
	res.json({ data: Users })
}); 

//view all coworking spaces
router.get('/PartnerCoworkingspaces',async (req, res) =>{
	const Users = await User.find({type:'coworkingspace'})
	 res.json({ data: Users })
	});

	router.post('/messages', async (req, res) => {

		try{
	
					var message = new Message(req.body);
					console.log(req.body);
			var savedMessage = await message.save();
	
				console.log('saved');
	
				res.sendStatus(200);
	
		}	
		catch (error){
	
			res.sendStatus(500);
	
			return console.log('error',error);
	
		}	
	})

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



	//--------------------------------nourhan----------------------------------------------
router.put('/apply/:pid/:tid/:agid',async(req , res)=> {
	const tid = parseInt(req.params.tid)
	const aid = parseInt(req.params.agid)
	const tmp = await User.findOneAndUpdate({userID : parseInt(req.params.pid), 'tasks.taskID' : tid},
	{$addToSet : {'tasks.$.agencies':  {agencyID : aid, accepted: false, assigned: false}}}
	)
	res.send("applied successfully")
})



//nourhan
//Get all bookings of a specific user
router.get('/roombookings/:userID',async (req, res) => {
  
	var userID = parseInt(req.params.userID);

	await User.find({userID : userID},{RoomsBooked : 1, _id :0},(err, roombookings)=>{

			res.send(roombookings);
	})

})

//get a room in a specific coworking space by id
router.get('/cospace/:id/rooms/:id2' ,async (req, res)=>{
	try{
	const test = await User.aggregate([
			{$unwind: "$rooms"},
			{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2)}},
			 {$project: {schedule:'$rooms.schedule',_id:0}}
	])
	 res.send(test.pop().schedule);
	}
	catch(error){
			res.send("not found")
			console.log("error")
	}
	
});

//book a room , append it to the array of bookings if it is not in my bookings
router.put('/cospace/:id/:userID/rooms/:id2/:id3' ,async(req, res)=>{
	const schedID = req.params.id3;
	const cospaceID = req.params.id;
	const roomID = req.params.id2;

	try{
	const test1 = await User.aggregate([
			{$unwind: "$rooms"},
			{$unwind: "$rooms.schedule"},
			{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
			{$project:{reserved:'$rooms.schedule.reserved',_id:0}}
	])

	//res.send(test1.pop().reserved == "true")
 if(test1.pop().reserved) return res.send({error:'already reserved'})

	const test = await User.aggregate([
			{$unwind: "$rooms"},
			{$unwind: "$rooms.schedule"},
			{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
			{$project:{date:'$rooms.schedule.Date',_id:0}}
	])

	const test3 = await User.aggregate([
			{$unwind: "$rooms"},
			{$unwind: "$rooms.schedule"},
			{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
			{$project:{time:'$rooms.schedule.time',_id:0}}
	])


	const f = await User.findOneAndUpdate({

			'userID' : parseInt(req.params.id)},
	
	{
			$set : {'rooms.$[i].schedule.$[j].reserved' : true, 'rooms.$[i].schedule.$[j].reservedBy' : {uid : parseInt(req.params.userID)}}
	},
	{
			arrayFilters : [{"i.id" : parseInt(roomID)},{"j.id" : parseInt(schedID)}]
	}
	
	)

	await User.findOneAndUpdate({userID : parseInt(req.params.userID)},
	{$addToSet : {RoomsBooked : {bookingID:new objectid(),coworkingSpaceID:parseInt(cospaceID), roomID :parseInt(roomID),
	scheduleID: parseInt(schedID),Date: test.pop().date, time:test3.pop().time}}}, 
	async function(err, model){
						 
			if(err)  return handleError(res, err)
			else res.json({msg:'Room was reserved successfully'})
	 });
	}
	catch(error){
			console.log(error)
			res.send("Not found")
	}
});

//------------------------------------------------------------------------------------------

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






//delete booking from user array + change reserved to false in coworking space array 
router.delete('/RoomBookings/:userID/:bookingID', async (req,res) => {

	try {
		const userID=parseInt(req.params.userID);
		const bookingID= parseInt(req.params.bookingID);
   
        const temp = await RoomBookings.find({userID});
        if(!temp[0])res.send('user id does not exist');
    //res.send(temp);
		const book = temp[0].bookings;
    const temp2 =await book.find(r => r.bookingID === bookingID);
    if(!temp2){

        res.status(404).send('The booking with the given id is not found');

        return;

		};
		const roomID=parseInt(temp2.roomID);
		const scheduleID=parseInt(temp2.scheduleID);
		const coworkingSpaceID=parseInt(temp2.coworkingSpaceID);

    PartnerCoworkingSpace.update({ 'coworkingSpaceID':coworkingSpaceID,'rooms.id':roomID,'rooms.schedule.id':scheduleID}, 
    {$set: {'rooms.$.schedule.reserved':false}}, function(err, model){});
    
	 
	 RoomBookings.update( {userID}, { $pull: { bookings: {bookingID:bookingID} }
	 }, function(err, model){})
		
		
    res.send('booking has been deleted successfully')
	}

	catch(error) {

			// We will be handling the error later

			console.log(error)

	}  

})

//assign managerial roles to tasks

router.put('/assign/:partnerID/:taskID/:memberID', async (req,res) => {

	try {

	 const partnerID=parseInt(req.params.partnerID)

	 const taskID=parseInt(req.params.taskID)

	 const memberID=parseInt(req.params.memberID)

	 const partner = await User.find({userID:partnerID});

	 if(!partner) res.send("Partner id is incorrect or this partner does not exist ")

	 //res.send(partner[0].tasks)
	 const taskArray= partner[0].tasks;
	 
	 const task=await taskArray.find(r => r.taskID === taskID)

	 if(!task) res.send("This task does not exist");

	 if(!task.wantsConsultant) res.send("You don't have access to this task")

	 //set assigneeID to inserted member ID
	 User.update({ 'userID':partnerID,'tasks.taskID':taskID}, 
	 {$set: {'tasks.$.assigneeID':memberID}}, function(err, model){});

	 //set life cycle 'assigned' stage to true
	 User.update({ 'userID':partnerID,'tasks.taskID':taskID}, 
	 {$set: {'tasks.$.lifeCycle.1':true}}, function(err, model){});
	 
	 res.send('Member has been assigned to task successfully')

	}

	catch(error) {

			// We will be handling the error later

			console.log(error)

	}  

})



module.exports = router;
