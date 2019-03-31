// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const mongoose = require('mongoose');


const users = require('../../models/UserProfile')


// Models
  //should ne removed

const User = require('../../models/UserProfile');


//nourhan
var objectid = require('mongodb').ObjectID


var Members = require('../../models/Member');
var partner = require('../../models/Partner');
const PartnerCoworkingSpace = require('../../models/cospaceMtest');
const RoomBookings = require('../../models/RoomBookings');


// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

//shaza
//get the coworking space by id
router.get('/PartnerCoworkingspaces/:id',async (req,res) =>{

	const Users =await User.find({type:'coworkingSpace',userID:parseInt(req.params.id)})
	if({Users:[]}) return res.json('Coworking space does not exist')
	res.json({ data: Users })
});

//view all coworking spaces
router.get('/PartnerCoworkingspaces',async (req, res) =>{
	const Users = await User.find({type:'coworkingSpace'})
	 res.json({ data: Users })
	});
	


	//--------------------------------nourhan----------------------------------------------


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




// Get all Members (Malak&Nour) MONGOUPDATED
router.get('/', (req, res) =>{	
	Members.find()
	.then(items=>res.json(items))});



//Get Specific Member (Malak&Nour) MONGOUPDATED
router.get('/:id', (req, res) => {
  Members.findById(req.params.id)
		.then(member=> res.json(member))
		.catch(err=>res.status(404).json({ msg: 'No Member with the id of ${req.params.id}'}))
});
//------------------------get all approved tasks------------------------------//
router.get('/allTasks',async (req,res)=>{
    //const member = await  users.find({type:"member"})
    const partner=await  users.find({type:"partner"})
    var tasks=[];
    for(var i=0;i<partner.length;i++){
        for(var j=0;j<partner[i].tasks.length;j++){
            if(partner[i].tasks[j].approved=== true)
            tasks.push(partner[i].tasks[j])
        }
	}
});

    


// Create a new member (Malak&Nour) MONGOUPDATED
router.post('/', async(req, res) => {
const {type,name, birthday,email ,SSN ,phoneNumber ,field, skills,interests ,jobsCompleted,certificates }=req.body
const member = await Members.findOne({email})
if(member) return res.status(400).json({error: 'Email already exists'})

	const newMember = new Member({
		name,
		birthday,
		email,
		SSN,
		phoneNumber,
		field,
		skills,
		interests,
		jobsCompleted,
		certificates,
		MemberTasks:[],
		activation:false,
	})
	newMember
	.save()
	.then(member => res.json({data :member}))
	.catch(err => res.json({error: 'Can not create member'}))
});
/*router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const book = await Book.findOne({id})
     if(!book) return res.status(404).send({error: 'Book does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedBook = await Book.updateOne(req.body)
     res.json({msg: 'Book updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
*/
// Update member (Malak&Nour) done except id non existent case
router.put('/:id', async (req,res) => {
	try {
	 const id = req.params.id
	 const member = await Members.findOne({id})
	 //if(!member) return res.status(404).send({error: 'Member does not exist'})
	// const isValidated = validator.updateValidation(req.body)
	 //if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
	 const updatedMember = await Members.updateOne(req.body)
	 res.json({msg: 'Member updated successfully'})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})


// Delete Member (Malak&Nour) MONGOUPDATED
router.delete('/:id', async (req,res) => {
	try {
	 const id = req.params.id
	 const deletedMember = await Members.findByIdAndRemove(id)
	 res.json({msg:'Member was deleted successfully', data: deletedMember})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})
  

//---------------------------- member view his tasks------------------------// 
router.get('/view/:id',async (req, response) => {
    var data = "";
    const memID= parseInt(req.params.id)
    const member = await  users.findOne({type:"member",userID:memID})
   console.log(member)
    if(member===null) {
         response.send("the databsae has no member with the given ID")
    } else {
        // Object is NOT empty
        data=member.memberTasks
         response.send(data);
    }
   
});
	


//---------------------------get the recommended tasks based on my field---------------------// 

router.get('/recoTasks/:idM',async(req,res)=>{
    const memID= parseInt(req.params.idM)
    const member = await  users.findOne({type:"member", userID:memID})
    const partner=await  users.find({type:"partner"})
    var tasks=[];
   // findOne()
 

  let data=""
     for(var i=0;i<partner.length;i++){
         for(var j=0;j<partner[i].tasks.length;j++){
             if(partner[i].tasks[j].field=== member.field && partner[i].tasks[j].approved=== true){
             tasks.push(partner[i].tasks[j])
             /*console.log(partner[i].tasks[j].field)
             console.log(partner[i].tasks[j].taskID)
             console.log(partner[i].tasks[j].name)
             console.log(partner[i].tasks[j].description)
             console.log(partner[i].userID)*/
             
                data += `<a href="/api/member/memID/${partner[i].tasks[j].taskID}">${partner[i].tasks[j].name}<br> ${partner[i].tasks[j].description}<br>${partner[i].name}</a><br>`;

             console.log(data)
            }
         }
        }

 res.send(data);

 
 });  
//------------------------------- member gets his average rating  -----------------------------------//

router.get('/MyRating/:MID', async(req, response) => {
   
    const MID = parseInt(req.params.MID)
    const member= await users.findOne({type:'member',userID:MID})
    const AllMyRatings = member.allRatings
    const Rlength = AllMyRatings.length
    //console.log(Rlength)
     var sum = 0;
     var avg = 0;

    if (Rlength !== 0)
    {
        sum = AllMyRatings.reduce(function(sum, b) { return sum + b; });
        //console.log(sum)
        avg = sum / Rlength
       // console.log(avg)
        response.json(avg)
    }
    else response.json(0)

});




 //------------------------apply for a task---------------------// 

router.put('/ApplyForTask/:id/:idp/:idt', async (req,res) => {
    const memID= parseInt(req.params.id)
    const partnerID=parseInt(req.params.idp)
    const partner= await users.findOne({type:'partner',userID:partnerID})

    const taskIDb=parseInt(req.params.idt)
    var taskapp={}
    var applicantsapp=[]
    var array_of_tasks=partner.tasks
    
    for(var i=0;i<array_of_tasks.length;i++){
        if(array_of_tasks[i].taskID===taskIDb && array_of_tasks[i].approved===true)
        taskapp=array_of_tasks[i]    //you have a task that is approved with this given id 
    } 
   applicantsapp= taskapp.applicants
   var app=[]

   for(var j=0;j<applicantsapp.length;j++){
       
       if(applicantsapp[j].accepted===true && applicantsapp[j].assigned===true && applicantsapp[j].applicantID !==memID ){
           app.push(applicantsapp[j])
       }
   }

   if(app.length===0)
         {
            applicantsapp.push({applicantID:memID,accepted:false,assigned:false})

            users.update({ 'userID':partnerID,'tasks.taskID':taskIDb }, 
            {$set: {'tasks.$.applicants':applicantsapp}}, function(err, model){}); 
            
            const partnerx= await users.findOne({type:'partner',userID:partnerID})
            res.json(partnerx)

         }
    else
    res.json("you can't apply for a task that already has a chosen member");

 


});
///////////////////////Get all approved tasks////////////////////////////  LINA
router.get('/Tasks',(req,res)=>{
	var tasks=[];
	 for(var i=0;i<partner.length;i++){
			 for(var j=0;j<partner[i].Tasks.length;j++){
					 if(partner[i].Tasks[j].approved=== true)
					 tasks.push(partner[i].Tasks[j])
			 }
	 }

	 

// Create a new member (Malak&Nour)
router.post('/', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;
	const email = req.body.email;
	const SSN = req.body.SSN;
	const phoneNumber = req.body.phoneNumber;
	const field= req.body.field;
	const skills = req.body.skills;
	const interests = req.body.interests;
	const jobsCompleted=req.body.jobsCompleted;
	const certificates = req.body.certificates;

	if (!name) return res.status(400).send({ err: 'Name field is required' });
	if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!age) return res.status(400).send({ err: 'Age field is required' });
	if (typeof age !== 'number') return res.status(400).send({ err: 'Invalid value for age' });
	if (!email) return res.status(400).send({ err: 'email field is required' });
	if (typeof email !== 'string') return res.status(400).send({ err: 'Invalid value for email' });
	if (!SSN) return res.status(400).send({ err: 'SSN field is required' });
	if (typeof SSN !== 'number') return res.status(400).send({ err: 'Invalid value for SSN' });
	if (!phoneNumber) return res.status(400).send({ err: 'phoneNumber field is required' });
	if (typeof phoneNumber !== 'number') return res.status(400).send({ err: 'Invalid value for phoneNumber' });



	const newMember = {
		name,
		age,
		email,
		SSN,
		phoneNumber,
		field,
		skills,
		interests,
		jobsCompleted,
		certificates,
		MemberTasks:[],
		activation:false,
		ID: uuid.v4(),
	};
	
	Members.push(newMember)
	return res.json({ data: newMember });
});

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
	const newMember = {
		name,
		age,
		ID: uuid.v4(),
	};
	return res.json({ data: newMember });
});*/

//Search  coworking spaces by location and capacity
router.get('/PartnerCoworkingspaces/Filter',(req,res)=>{
	if(req.body.location&&req.body.capacity)
	PartnerCoworkingSpace.find( {$and: [{"address":req.body.location},{"rooms.capacity":req.body.capacity}]})
	.then(p=> (!p)? res.json({msg:'No coworking space with your specifications found'}) : res.json(p));
	if(req.body.location&&!req.body.capacity)
	PartnerCoworkingSpace.find( {"address":req.body.location})
	.then(p=> (!p)? res.json({msg:'No coworking space with your specifications found'}): res.json(p));
	if(!req.body.location&&req.body.capacity)
	PartnerCoworkingSpace.find( {"rooms.capacity":req.body.capacity})
	.then(p=> (!p)? res.json({msg:'No coworking space with your specifications found'}): res.json(p));
});


// //shaza
// //get the coworking space by id
// router.get('/PartnerCoworkingspaces/:id',(req,res)=>{
// 	const PartnerCoworkingspaces=PartnerCoworkingSpace.find(c=>c.id===parseInt(req.params.id));
// 	if(!PartnerCoworkingspaces) return res.status(404).send('coworkingspace not found');
// 	res.send(PartnerCoworkingspaces);
// });

// //view all coworking spaces
// router.get('/PartnerCoworkingspaces',(req,res)=>{
// 	res.send(PartnerCoworkingSpace);
// }); 


// //nourhan
// //Get all bookings of a specific user

// router.get('/RoomBookings/:userID' ,async (req, res)=>{
// 	const userID=req.params.userID
// 	const bookings = await RoomBookings.findOne({userID})   
//     if(!bookings) res.send('There are no bookings for this user')
// 		res.json({data: bookings.bookings});
// });

// //get a room in a specific coworking space by id
// router.get('/cospace/:id/rooms/:id2' ,(req, res)=>{
//     var scheduleroom = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id === parseInt(req.params.id2));
//     if(!scheduleroom){
//         res.status(404).send('The room with the given id is not found');
//         return;
//     }
//     res.send(scheduleroom.schedule);
// });

// //book a room , append it to the array of bookings if it is not in my bookings
// router.put('/cospace/:userid/:id/rooms/:id2/:id3' ,(req, res)=>{
//     let scheduleroom = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id === parseInt(req.params.id2));
//     if(!scheduleroom){
//         res.status(404).send('The room with the given id is not found');
//         return;
//     };
//     const scheduleOfRoom = scheduleroom.schedule;

//     const schema = {
//         reserved: Joi.boolean()
//     };
//     const result = Joi.validate(req.body, schema);
//     if(result.error){
//         res.status(400).send(result.error.details[0].message)
//     }

//     let h = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id 
//         === parseInt(req.params.id2)).schedule.find(r =>r.id === parseInt(req.params.id3));
//      let h2 = RoomBookings.find(l2 => l2.userID === parseInt(req.params.userid));

//      for(var i = 0;i<h2.bookings.length;i++){
//          if(parseInt(req.params.id3) === parseInt(h2.bookings[i].scheduleID) && parseInt(req.params.id2) === parseInt(h2.bookings[i].roomID)){
//              res.status(400).send('already reserved');
//              return;
//          }
//         }
//      //if(h.id === parseInt())
//      const temp = {
//         bookingID:h2.bookings.length+1 ,
//         coworkingSpaceID:parseInt(req.params.id),
//         roomID:parseInt(req.params.id2),
//         scheduleID : h.id,
//         Date : h.Date,
//         time: h.time
//     };
//     h2.bookings.push(temp);
//     var reservation = scheduleOfRoom.find(i => i.id === parseInt(req.params.id3));
//     if(reservation.reserved === true){
//         res.send('A reserver room');
//         return;
//     }
//     reservation.reserved = req.body.reserved;
//     res.send(RoomBookings);
// });


// //delete booking from user array + change reserved to false in coworking space array 
// router.delete('/RoomBookings/:userID/:bookingID', async (req,res) => {

// 	try {
// 		const userID=parseInt(req.params.userID);
// 		const bookingID= parseInt(req.params.bookingID);
   
// 		const temp = await RoomBookings.find({userID});
//     //res.send(temp);
// 		 if(!temp[0])res.send('user id does not exist');
// 		const book = temp[0].bookings;
//     const temp2 =await book.find(r => r.bookingID === bookingID);
//     if(!temp2){

//         res.status(404).send('The booking with the given id is not found');

//         return;

// 		};
// 		const roomID=parseInt(temp2.roomID);
// 		const scheduleID=parseInt(temp2.scheduleID);
// 		const time=parseInt(temp2.time);
// 		const date=temp2.date;
// 		const coworkingSpaceID=parseInt(temp2.coworkingSpaceID);

//     PartnerCoworkingSpace.update({ 'coworkingSpaceID':coworkingSpaceID,'rooms.id':roomID,'rooms.schedule.id':scheduleID}, 
//     {$set: {'rooms.$.schedule.reserved':false}}, function(err, model){});
    
	 
// 	 RoomBookings.update( {userID}, { $pull: { bookings: {bookingID:bookingID} }
// 	 }, function(err, model){})
		
		
//     res.send('booking has been deleted successfully')
// 	}

// 	catch(error) {

// 			// We will be handling the error later

// 			console.log(error)

// 	}  

// })






module.exports = router;
