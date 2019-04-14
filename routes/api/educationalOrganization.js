// ---------------express-------------
const express = require('express');
const router = express.Router();

//-------------------Models-------------------
const EducationalOrganisation = require('../../models/EducationalOrganization');


//============================== recieve notifications=================================//



// const job = cron.job('*/10 * * * * *', () => 
//     // console.log('helloo'),
//   //   getUsers(),
//      sendNotification('5c9114781c9d440000a926ce')

// );
// //job.start()

// async function sendNotification(Id){
//   const ID= ObjectId(Id)
//   const user = await users.findOne(ID)
//   const notif= user.notifications
//   console.log(notif)
//   notif.forEach(element => {

//     notifier.notify({
//       title: 'New Notification' ,
//       message: element.notificationContent,
//       //icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
//       sound: true, // Only Notification Center or Windows Toasters
//       wait: true // Wait with callback, until user action is taken against notification
//     }, function (err, response) {});
  
//     console.log(element.notifID)
//     notifier.on('click', function(notifierObj, options) {
//        users.updateOne({'_id':ID, }, 
//                        {$set: {'notifications.$[i].read': true, 'notifications.$[i].unread': false}},
//                        { arrayFilters: [{ "i.notifID": element.notifID }]},
//                        function(err, model){}); 

//       // element.read= true,
//       // element.unread= false
//       // // Triggers if `wait: true` and user clicks notification
//     //  console.log('The user clicked on the Notification!');
//     });
//   });
     
 
 
// }



//==================================================================================================================


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

//Get all bookings of a specific user

router.get('/roombookings/:userID',async (req, res) => {

  

	var userID = parseInt(req.params.userID);



	const roombookings = await User.find({userID : userID},{RoomsBooked : 1, _id :0})



		//	res.send(roombookings);

		//	console.log(roombookings.length)
			res.json({data : roombookings.pop().RoomsBooked});

	



})



//get a schedule room in a specific coworking space by id

router.get('/cospace/:id/rooms/:id2' ,async (req, res)=>{

	try{

	const test = await User.aggregate([

			{$unwind: "$rooms"},

			{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2)}},

			 {$project: {schedule:'$rooms.schedule',_id:0}}

	])
	res.json({data:test.pop().schedule});

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

const test0 = await User.aggregate([

	{$unwind: "$rooms"},

	{$unwind: "$rooms.schedule"},

	{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},

	{$project:{reserved:'$rooms.schedule.reserved',_id:0}}

])



await User.findOneAndUpdate({userID : parseInt(req.params.userID)},

{$addToSet : {RoomsBooked : {bookingID:new objectid(),coworkingSpaceID:parseInt(cospaceID), roomID :parseInt(roomID),

scheduleID: parseInt(schedID),Date: test.pop().date, time:test3.pop().time}}}, 

async function(err, model){

				 

	if(err)  return handleError(res, err)

	else res.json({data : test0.pop().reserved})

});

}

catch(error){
	console.log(error)

			res.send("Not found")

	}

});


//delete booking and set the reservation boolean to false so others can now book it
router.delete('/method2/RoomBookings/:userID/:bookingID',async (req, res) => {
	// try{
		 const test = await User.aggregate([
			 {$unwind: "$RoomsBooked"},
			 {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},
			 {$project: {'RoomsBooked.bookingID':1,_id:0}}
		 ])
 
 
	  if(test==0) return res.send({error:'booking does not exist.'})
 
 
	  const test1 = await User.aggregate([
		 {$unwind: "$RoomsBooked"},
		 {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},
		 {$project: {cospaceID:'$RoomsBooked.coworkingSpaceID',_id:0}}
	 ])
	 const test2 = await User.aggregate([
		 {$unwind: "$RoomsBooked"},
		 {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},
		 {$project: {roomid:'$RoomsBooked.roomID',_id:0}}
	 ])
	 const test3 = await User.aggregate([
		 {$unwind: "$RoomsBooked"},
		 {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},
		 {$project: {scheduID:'$RoomsBooked.scheduleID',_id:0}}
	 ])
 
	 
 
	 const f =await User.findOneAndUpdate({
		 'userID' : test.pop().cospaceID},
	 
	 {
		 $set : {'rooms.$[i].schedule.$[j].reserved' : false, 'rooms.$[i].schedule.$[j].reservedBy' : {}}
	 },
	 {
		 arrayFilters : [{"i.id" : test2.pop().roomid},{"j.id" : test3.pop().scheduID}]
	 }
	 
	 )
 
	 const y =await User.update(
		 {userID : parseInt(req.params.userID)},
		 {$pull : {RoomsBooked : {bookingID : objectid(req.params.bookingID),}}},{multi : true}, async function(err, model){
				
			 if(err)  return handleError(res, err)
			 else {
				 
				 res.json({msg:'reservation was deleted successfully'})
		 }
		  });

 });

module.exports = router;
