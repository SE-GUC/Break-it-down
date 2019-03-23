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
router.get('/roombookings/:userID',async (req, res) => {
  
    var userID = parseInt(req.params.userID);

    await user.find({userID : userID},{RoomsBooked : 1, _id :0},(err, roombookings)=>{

        res.send(roombookings);
    })
  
  })

//get a room in a specific coworking space by id
router.get('/cospace/:id/rooms/:id2' ,async (req, res)=>{
    try{
    const test = await user.aggregate([
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
    const test1 = await user.aggregate([
        {$unwind: "$rooms"},
        {$unwind: "$rooms.schedule"},
        {$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
        {$project:{reserved:'$rooms.schedule.reserved',_id:0}}
    ])

    //res.send(test1.pop().reserved == "true")
   if(test1.pop().reserved) return res.send({error:'already reserved'})

    const test = await user.aggregate([
        {$unwind: "$rooms"},
        {$unwind: "$rooms.schedule"},
        {$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
        {$project:{date:'$rooms.schedule.Date',_id:0}}
    ])

    const test3 = await user.aggregate([
        {$unwind: "$rooms"},
        {$unwind: "$rooms.schedule"},
        {$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},
        {$project:{time:'$rooms.schedule.time',_id:0}}
    ])


    const f = await user.findOneAndUpdate({

        'userID' : parseInt(req.params.id)},
    
    {
        $set : {'rooms.$[i].schedule.$[j].reserved' : true, 'rooms.$[i].schedule.$[j].reservedBy' : {uid : parseInt(req.params.userID)}}
    },
    {
        arrayFilters : [{"i.id" : parseInt(roomID)},{"j.id" : parseInt(schedID)}]
    }
    
    )

    await user.findOneAndUpdate({userID : parseInt(req.params.userID)},
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


module.exports = router
