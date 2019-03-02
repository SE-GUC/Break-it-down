const express= require('express');
const router= express.Router();
const Joi = require('joi');

const partner = require('../../models/Partner');



//-----------------------------------partner submit task description------------------------------------------- eman

router.post('/', (req, res)=> {
   const name = req.body.name;
   const ownerID = req.body.ownerID;
   const description= req.body.description;
   const wantsConsultant= req.body.wantsConsultant;
   const applicants= [];
   const approved= false;
   const schema={
      name:Joi.string().required(),
       ownerID:Joi.number().required(),
      description:Joi.string().required(),
       wantsConsultant:Joi.boolean().required()
    
   }
   const result=Joi.validate(req.body,schema)
 
   if(result.error)
    return res.status(400).send(error.details[0].message);


    const newtask = {
        name,
        description,
        wantsConsultant, 
        approved,
        applicants
        
    };

    const t = partner.find(t => t.ID === ownerID )
    t.Tasks.push(newtask);
    return res.json({ data: t });
    


});
///////////////////Partner view tasks and assign////////// eman
router.get('/:idP/:idT',(req,res)=>{
    const partnerID=parseInt(req.params.idP)
    
    const partner1= partner.find(partner1 => partner1.ID === partnerID)

    const taskID=parseInt(req.params.idT)
    
    const task1= partner1.Tasks.find(task1 => task1.taskID === taskID)

    const index = partner.indexOf(partner1)

    const index1=partner1.Tasks.indexOf(task1)

    const tasks=partner[index].Tasks[index1].applicants


 
 
 res.send(tasks);
 
 }); 

 /////////////choose and send the applicant to the admin to assign/////////////////// Janna
 router.put('/:idP/:idT',(req,res)=>{
    const partnerID=parseInt(req.params.idP)
    
    const partner1= partner.find(partner1 => partner1.ID === partnerID)

    const taskID=parseInt(req.params.idT)
    
    const task1= partner1.Tasks.find(task1 => task1.taskID === taskID)

    const index = partner.indexOf(partner1)

    const index1=partner1.Tasks.indexOf(task1)

    const tasks=partner[index].Tasks[index1].applicants

   
    const applicantID = req.body.applicantID
    const schema = {

        applicantID:Joi.number().required()

    }
    const result=Joi.validate(req.body,schema)
   
    if(result.error)
     return res.status(400).send(error.details[0].message);

    
     const applicantq=partner[index].Tasks[index1].applicants.filter(applicantq=> applicantq.accepted===true)
     if(applicantq.length===0){
     const appl=partner[index].Tasks[index1].applicants.find(appl => appl.applicantID === applicantID && appl.accepted=== false)
     const applicant=partner[index].Tasks[index1].applicants.indexOf(appl)
 
     partner[index].Tasks[index1].applicants[applicant].accepted= true
     res.send(tasks);
    }
     else{
         res.send("you already accepted a member")
     }

 }); 


 






router.get('/', (req, res) => res.json({ data: partner }));



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


module.exports = router
