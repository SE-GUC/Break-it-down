//--------------------express--------------------
const express = require('express');
const router = express.Router();

//--------------------models--------------------
const users = require('../../models/UserProfile');
const ConsultancyAgency = require('../../models/consultancyAgency');
const Message = require('../../models/messages');
const recommendedAppl = require('../../models/RecommendedApplicants');


//-------------------pathToSendFile----------------------------
var path = require('path');

var objectid = require('mongodb').ObjectID



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

//-----------------------chat-----------------------------

router.get('/chat',function(req,res){
    res.sendFile(path.resolve('./indexx.html'));
	});
	
	//----------------------------------view messages---------------------------------- 
router.get('/viewmessages', async (req, res) => {
    const updt=await Message.find()
    res.json({ data: updt })
})



//--------------------filter tasks--------------------
router.get('/filterTasks/:memberID', async (req, res) =>{
try{
//Member skills
const memberSkills = await users.findOne({type:"member",'userID':parseInt(req.params.memberID)},{skills:1,_id:0})
//Member field
const memberField = await users.findOne({type:"member",'userID':parseInt(req.params.memberID)},{field:1,_id:0})
//Resulting tasks
var recommendedTasks=[]
//All partner tasks
const grptasks = await users.find({type:"partner"},{"tasks":1,_id:0})
//var grpTasks= groupBy2(tasks,'field')
for (var i = 0; i < grptasks.length; i++) {
	for (var j =0; j< grptasks[i].tasks.length; j++){
	if(grptasks[i].tasks[j].approved===true && grptasks[i].tasks[j].lifeCycle[1]===false && grptasks[i].tasks[j].field===memberField.field)
	{
		recommendedTasks.push(grptasks[i].tasks[j])
	}
	}
}
res.json(recommendedTasks)
}
catch(error){
res.send(error)
}
});
function groupBy2(xs, prop) {
var grouped = {};
for (var i=0; i<xs.length; i++) {
	var p = xs[i][prop];
	if (!grouped[p]) { grouped[p] = []; }
	grouped[p].push(xs[i]);
}
return grouped;
}
//--------------Filter applicants-----------------------------
router.get('/filterApplicants/:partnerID', async (req, res) =>{
try{
//Partner tasks
const tasks = await users.findOne({type:"partner",'userID':parseInt(req.params.partnerID)},{"tasks":1,_id:0})
//Resulting applicants
var applicantsPerTask= []
for (var i = 0; i < tasks.tasks.length; i++) {
if(tasks.tasks[i].lifeCycle[0]===true && tasks.tasks[i].lifeCycle[1]===false && tasks.tasks[i].approved===true && tasks.tasks[i].wantsConsultant===true){
const currentTask = tasks.tasks[i].taskID

var result = {"taskID":currentTask, "field":tasks.tasks[i].field, "applicants":[]}

for (var j =0; j< tasks.tasks[i].applicants.length; j++){
	if(tasks.tasks[i].applicants[j].assigned===false)
	{	
		
		const applicant = tasks.tasks[i].applicants[j].applicantID
		const member = await User.findOne({'userID':applicant})
		if(member.field===tasks.tasks[i].field)
			result.applicants.push(member)
	}
	}
if(result.applicants.length>0) 
		{
			applicantsPerTask.push(result)	
			//res.json(applicantsPerTask)
		}
		result = {}
	}
	}
res.json(applicantsPerTask)
}
catch(error){
res.json(error.message)
}
});
//------------look for a particular coworking space-----------
var objectid = require('mongodb').ObjectID
router.get('/PartnerCoworkingspaces/:id',async (req,res) =>{

const Users =await users.find({type:'coworkingspace',userID:parseInt(req.params.id)})
if(!Users) return res.json('Coworking space does not exist')
res.json({ data: Users });
}); 

//------------------view all coworking spaces---------------
router.get('/PartnerCoworkingspaces',async (req, res) =>{
const Users = await users.find({type:'coworkingspace'})
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

//--------------get all consultancy agencies-----------
router.get('/', async (req,res) => {
const ConsultancyAgencys = await ConsultancyAgency.find()
res.json({data: ConsultancyAgencys})
})

//--------------get specific consultancy agencies-----------
router.get('/:id', (req, res) => {
const found = consultancyAgencys.some(consultancyAgency => consultancyAgency.id == (req.params.id));

if (found) {
	res.json(consultancyAgencys.filter(consultancyAgency => consultancyAgency.id == (req.params.id)));
} else {
	res.status(404).json({ msg: `No Consultancy Agency with the id of ${req.params.id}` });
}
});

//--------------apply for a task-----------
router.put('/apply/:pid/:tid/:agid',async(req , res)=> {
const tid = parseInt(req.params.tid)
const aid = parseInt(req.params.agid)
const tmp = await users.findOneAndUpdate({userID : parseInt(req.params.pid), 'tasks.taskID' : tid},
{$addToSet : {'tasks.$.agencies':  {agencyID : aid, accepted: false, assigned: false}}}
);
res.send("applied successfully")
});

//--------------------------------nourhan----------------------------------------------


//Get all bookings of a specific user

router.get('/roombookings/:userID',async (req, res) => {

var userID = parseInt(req.params.userID);

await users.find({userID : userID},{RoomsBooked : 1, _id :0},(err, roombookings)=>{

		res.send(roombookings);
})

})



//get a schedule room in a specific coworking space by id

router.get('/cospace/:id/rooms/:id2' ,async (req, res)=>{
try{
const test = await users.aggregate([
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
const test1 = await users.aggregate([
		{$unwind: "$rooms"},
		{$unwind: "$rooms.schedule"},
		{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
		{$project:{reserved:'$rooms.schedule.reserved',_id:0}}
])

if(test1.pop().reserved) return res.send({error:'already reserved'})

const test = await users.aggregate([
		{$unwind: "$rooms"},
		{$unwind: "$rooms.schedule"},
		{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
		{$project:{date:'$rooms.schedule.Date',_id:0}}
])

const test3 = await users.aggregate([
		{$unwind: "$rooms"},
		{$unwind: "$rooms.schedule"},
		{$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
		{$project:{time:'$rooms.schedule.time',_id:0}}
])


const f = await users.findOneAndUpdate({

		'userID' : parseInt(req.params.id)},

{
		$set : {'rooms.$[i].schedule.$[j].reserved' : true, 'rooms.$[i].schedule.$[j].reservedBy' : {uid : parseInt(req.params.userID)}}
},
{
		arrayFilters : [{"i.id" : parseInt(roomID)},{"j.id" : parseInt(schedID)}]
}

)

await users.findOneAndUpdate({userID : parseInt(req.params.userID)},
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

//FOR TESTING temp
router.get('/lastelem',async(req,res)=>{
	const a=await  User.aggregate([
		{$match:{userID:2007}},
		{
			
		  $project:
		   {
			  last: { $arrayElemAt: [ "$RoomsBooked", -1 ] }
		   }
		}
	 ])
	 res.send(a.pop().last.bookingID)
//	 res.send(l())
})

//FOR TESTING delete booking and set the reservation boolean to false so others can now book it
router.delete('/nourhan/RoomBookings/:userID/:bookingID',async (req, res) => {
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
		 'userID' : test1.pop().cospaceID},
	 
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
 
 



//-----------------------------------------------------------------------------------------------


//--------------get specific consultancy agencies-----------
router.get('/:id', (req, res) => {
	const found = consultancyAgencys.some(consultancyAgency => consultancyAgency.id == (req.params.id));
  
	if (found) {
	  res.json(consultancyAgencys.filter(consultancyAgency => consultancyAgency.id == (req.params.id)));
	} else {
	  res.status(404).json({ msg: `No Consultancy Agency with the id of ${req.params.id}` });
	}
  });

//------------------Update consultancyAgency (Malak&Nour) done except id non existent case--------------
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


//---------------Delete consultancyAgency (Malak&Nour) MONGOUPDATED----------------
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



//------------delete booking from user array + change reserved to false in coworking space array----------
router.delete('/RoomBookings/:userID/:bookingID', async (req,res) => {

try {
	const userID=parseInt(req.params.userID);
	const bookingID= parseInt(req.params.bookingID);
	
			const temp = await users.find({userID});
			if(!temp[0])res.send('user id does not exist');
	const book = temp[0].RoomsBooked;
	const temp2 =await book.find(r => r.bookingID === bookingID);
	if(!temp2){

			res.status(404).send('The booking with the given id is not found');

			return;

	};
	const roomID=parseInt(temp2.roomID);
	const scheduleID=parseInt(temp2.scheduleID);
	const coworkingSpaceID=parseInt(temp2.coworkingSpaceID);
	//res.send(roomID+" "+scheduleID+""+coworkingSpaceID);
	//,'rooms.id':roomID,'rooms.schedule.id':scheduleID
	//'rooms.$.schedule.reserved':false
	users.update({'type':'coworkingspace','userID':coworkingSpaceID,'rooms.id':roomID,'rooms.schedule.id':scheduleID}, 
	{$set: {'rooms.$.schedule.reserved':false}}, function(err, model){});
	
	users.updateOne( {userID}, { $pull: { RoomsBooked: {bookingID:bookingID} }
	}, function(err, model){})
	
	
	res.send('booking has been deleted successfully')
}

catch(error) {
		console.log(error)

}  

});

//----------------assign managerial roles to tasks----------------

router.put('/assign/:partnerID/:taskID/:memberID', async (req,res) => {

try {

	const partnerID=parseInt(req.params.partnerID)

	const taskID=parseInt(req.params.taskID)

	const memberID=parseInt(req.params.memberID)

	const partner = await users.find({userID:partnerID});

	if(!partner) res.send("Partner id is incorrect or this partner does not exist ")

	//res.send(partner[0].tasks)
	const taskArray= partner[0].tasks;
	
	const task=await taskArray.find(r => r.taskID === taskID)

	if(!task) res.send("This task does not exist");

	if(!task.wantsConsultant) res.send("You don't have access to this task")

	//set assigneeID to inserted member ID
	users.update({ 'userID':partnerID,'tasks.taskID':taskID}, 
	{$set: {'tasks.$.assigneeID':memberID}}, function(err, model){});

	//set life cycle 'assigned' stage to true
	users.update({ 'userID':partnerID,'tasks.taskID':taskID}, 
	{$set: {'tasks.$.lifeCycle.1':true}}, function(err, model){});
	
	res.send('Member has been assigned to task successfully')

}

catch(error) {

		// We will be handling the error later

		console.log(error)

}  

});




module.exports = router;
