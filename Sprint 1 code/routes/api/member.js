// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
var Members = require('../../Models/Member');
var partner = require('../../models/Partner');


// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200



// Get all Members (Malak&Nour)
router.get('/', (req, res) => res.json({Members }));


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

//Get Specific Member (Malak&Nour)
router.get('/:ID', (req, res) => {
	const found = Members.some(member => member.ID == (req.params.ID));
  
	if (found) {
	  res.json(Members.filter(member => member.ID == (req.params.ID)));
	} else {
	  res.status(404).json({ msg: `No member with the ID of ${req.params.ID}` });
	}
	});


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

	//If Needed Later

	/*if (!field) return res.status(400).send({ err: 'field field is required' });
	if (typeof field !== 'string') return res.status(400).send({ err: 'Invalid value for field' });
	if (!skills) return res.status(400).send({ err: 'skills field is required' });
	if (typeof skills !== 'string') return res.status(400).send({ err: 'Invalid value for skills' });
	if (!interests) return res.status(400).send({ err: 'interests field is required' });
	if (typeof interests !== 'string') return res.status(400).send({ err: 'Invalid value for name' });
	if (!jobsCompleted) return res.status(400).send({ err: 'jobsCompleted field is required' });
	if (typeof jobsCompleted !== 'string') return res.status(400).send({ err: 'Invalid value for jobsCompleted' });
	if (!certificates) return res.status(400).send({ err: 'certificates field is required' });
	if (typeof certificates !== 'string') return res.status(400).send({ err: 'Invalid value for certificates' });
	
	*/

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


// Update member (Malak&Nour)
router.put('/:ID', (req, res) => {
	const found = Members.some(member => member.ID == (req.params.ID));
  
	if (found) {
	  const updMember = req.body;
	  Members.forEach(member => {
		if (member.ID == (req.params.ID)) {
		  member.name = updMember.name ? updMember.name : member.name;
		  member.age = updMember.age ? updMember.age : member.age;
		  member.email = updMember.email ? updMember.email : member.email; 
		  member.SSN = updMember.SSN ? updMember.SSN : member.SSN;
		  member.phoneNumber = updMember.phoneNumber ? updMember.phoneNumber : member.phoneNumber;
		  member.skills = updMember.skills ? updMember.skills : member.skills;
		  member.interests = updMember.interests ? updMember.interests : member.interests;
		  member.jobsCompleted = updMember.jobsCompleted ? updMember.jobsCompleted : member.jobsCompleted;
		  member.certificates = updMember.certificates ? updMember.certificates : member.certificates;

		  res.json({ msg: 'Member successfully updated', member });
		}
	  });
	} else {
	  res.status(400).json({ msg: `No member with the ID of ${req.params.ID}` });
	}
  });


// Delete Member (Malak&Nour)
router.delete('/:ID', (req, res) => {
	const found = Members.some(member => member.ID == (req.params.ID));
  
	if (found) {
	  Members=Members.filter(member => member.ID != (req.params.ID))
	  res.json({
		msg: 'Member successfully deleted',
		Members }
	  );
	} else {
	  res.status(400).json({ msg: `No member with the ID of ${req.params.ID}` });
	}
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
app.get('/api/PartnerCoworkingspaces/:id',(req,res)=>{
	const PartnerCoworkingspaces=PartnerCoworkingSpace.find(c=>c.id===parseInt(req.params.id));
	if(!PartnerCoworkingspaces) return res.status(404).send('coworkingspace not found');
	res.send(PartnerCoworkingspaces);
});

//view all coworking spaces
app.get('/api/PartnerCoworkingspaces',(req,res)=>{
	res.send(PartnerCoworkingSpace);
}); 

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