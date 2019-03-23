// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
var Members = require('../../models/Member');
var partner = require('../../models/Partner');
const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');
const RoomBookings = require('../../models/RoomBookings');

// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200



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
  

	//////////// member view his tasks////////////////////////////// EMAN
router.get('/:id/Tasks/', (request, response) => {
	var data = "";
	Members.forEach((value) => {
			if(value.ID === parseInt(request.params.id)) {
					data = `Id: ${value.ID}<br>MemberName: ${value.name}<br>MemberTaks:${value.MemberTasks}`;
					return;
			}
	});
	response.send(data || 'No member matches the requested id');
});
	


	////////get the recommended tasks based on my field//////////////// JANNA

router.get('/:idM/Tasks/Rec',(req,res)=>{
	const memID= parseInt(req.params.idM)
	const member1= Members.find(member1 => member1.ID === memID)
	var tasks=[];

	let data=""

	 for(var i=0;i<partner.length;i++){
			 for(var j=0;j<partner[i].Tasks.length;j++){
					 if((partner[i].Tasks[j].field=== member1.field &&   partner[i].Tasks[j].approved=== true) )
					 {tasks.push(partner[i].Tasks[j])
							data += `<a href="/api/member/memID/${partner[i].ID}/${partner[i].Tasks[j].taskID}">${partner[i].Tasks[j].name}<br> ${partner[i].Tasks[j].description}<br>${partner[i].name}</a><br>`;
						
					}
			 }
	 }


res.send(data);


});  



/////////////////////apply for a task//////////// LINA

router.put('/:id/Tasks/:idp/:idt', async (req,res) => {
	const memID= parseInt(req.params.id)
	const member1= Members.find(member1 => member1.ID === memID)
	console.log(memID)
	const partnerID=parseInt(req.params.idp)
	
	const partner1= partner.find(partner1 => partner1.ID === partnerID)

	const taskID=parseInt(req.params.idt)
	
	const task1= partner1.Tasks.find(task1 => task1.taskID === taskID)
	var tasks=[];
	 
	const taskp=partner1.Tasks
	var  findApproved = taskp.find(findApproved=>findApproved.taskID===taskID && findApproved.approved=== true )
 const applicantsCheck= findApproved.applicants.filter(applicantsCheck=> applicantsCheck.accepted===true && applicantsCheck.applicantID ==!memID)
console.log(findApproved)
 console.log(applicantsCheck) 
	if(applicantsCheck.length===0)
			 {

					const index = partner.indexOf(partner1)

					const index1=partner1.Tasks.indexOf(task1)

					partner[index].Tasks[index1].applicants.push({applicantID:memID,accepted:false})

					res.json("good luck you are inserted in applicants list");
				 
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

	 

res.send(tasks);

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
router.put('/cospace/:userid/:id/rooms/:id2/:id3' ,(req, res)=>{
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