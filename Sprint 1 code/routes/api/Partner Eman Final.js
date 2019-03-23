const express= require('express');
const router= express.Router();
const Joi = require('joi');

const partner = require('../../models/Partner');
const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');

const user = require('../../models/UserProfile');

//nourhan

 var mongoose = require('mongoose');
 var objectid = require('mongodb').ObjectID
 //var autoIncrement=require('mongoose-sequence');
 const RoomBooking = require('../../models/RoomBookings');

//const Message = require('../../models/Message')

// nourhan---------------------------------------------for the next time----------------------------------------------
// router.get('/messages/:user',async (req, res) => {
  
//     var user = req.params.user
  
//     Message.find({name: user},(err, messages)=> {
  
//       res.send(messages);
  
//     })
  
//   })

//----------------------------------------------------------------------------------------------------------------------



//Get all bookings of a specific user
router.get('/roombookings/:userID',async (req, res) => {
  
    var userID = parseInt(req.params.userID);

    await user.find({userID : userID},{RoomsBooked : 1, _id :0},(err, roombookings)=>{

        res.send(roombookings);
    })
  
  })

//get a room schedule in a specific coworking space by id
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
//  /rooms/:id2/:id3
    // const test = await user.aggregate([
    //     {$unwind: "$rooms"},
    //     {$match: {userID:parseInt(cospaceID),type:"coworkingSpace","rooms.id":parseInt(roomID)}}
    // ])

    // const t = await user.updateOne(
    //     {userID : cospaceID, "rooms.id":roomID, "rooms.schedule.id": schedID},
    //     {$set: {"rooms.schedule.reserved":true}}
    // )

    // var h2 = RoomBooking.find({username : req.params.userid},{bookings:1});
    //  for(var i = 0;i<h2.length;i++){
    //      if(parseInt(req.params.id3) === parseInt(h2[i].scheduleID) && parseInt(req.params.id2) === parseInt(h2.bookings[i].roomID)){
    //          res.status(400).send('already reserved');
    //          return;
    //      }
    //     }

    //     const temp = {
    //     bookingID:3 ,
    //     coworkingSpaceID:parseInt(req.params.id),
    //     roomID:parseInt(req.params.id2),
    //     scheduleID : 2,
    //     Date : "22/3",
    //     time: "7"
    // };

    // const t = RoomBooking.update(
    //     {userID : parseInt("1")},
    //     { $push: { bookings: {
    //         $each : [{bookingID:6, name : "ahmed"}]
    //     } }}
    // )
    // res.send("updated successfully");

    // let scheduleroom = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id === parseInt(req.params.id2));
    // if(!scheduleroom){
    //     res.status(404).send('The room with the given id is not found');
    //     return;
    // };
    // const scheduleOfRoom = scheduleroom.schedule;

    // const schema = {
    //     reserved: Joi.boolean()
    // };
    // const result = Joi.validate(req.body, schema);
    // if(result.error){
    //     res.status(400).send(result.error.details[0].message)
    // }

    // let h = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id 
    //     === parseInt(req.params.id2)).schedule.find(r =>r.id === parseInt(req.params.id3));
    //  let h2 = RoomBookings.find(l2 => l2.userID === parseInt(req.params.userid));

    //  for(var i = 0;i<h2.bookings.length;i++){
    //      if(parseInt(req.params.id3) === parseInt(h2.bookings[i].scheduleID) && parseInt(req.params.id2) === parseInt(h2.bookings[i].roomID)){
    //          res.status(400).send('already reserved');
    //          return;
    //      }
    //     }
    //  //if(h.id === parseInt())
    //  const temp = {
    //     bookingID:h2.bookings.length+1 ,
    //     coworkingSpaceID:parseInt(req.params.id),
    //     roomID:parseInt(req.params.id2),
    //     scheduleID : h.id,
    //     Date : h.Date,
    //     time: h.time
    // };
    // h2.bookings.push(temp);
    // var reservation = scheduleOfRoom.find(i => i.id === parseInt(req.params.id3));
    // if(reservation.reserved === true){
    //     res.send('A reserver room');
    //     return;
    // }
    // reservation.reserved = req.body.reserved;
    // res.send(RoomBookings);
});


//delete booking and set the reservation boolean to false so others can now book it
router.delete('/RoomBookings/:userID/:bookingID',async (req, res) => {
   // try{
        const test = await user.aggregate([
            {$unwind: "$RoomsBooked"},
            {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},
            {$project: {'RoomsBooked.bookingID':1,_id:0}}
        ])


     if(test==0) return res.send({error:'booking does not exist.'})


     const test1 = await user.aggregate([
        {$unwind: "$RoomsBooked"},
        {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},
        {$project: {cospaceID:'$RoomsBooked.coworkingSpaceID',_id:0}}
    ])
    const test2 = await user.aggregate([
        {$unwind: "$RoomsBooked"},
        {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},
        {$project: {roomid:'$RoomsBooked.roomID',_id:0}}
    ])
    const test3 = await user.aggregate([
        {$unwind: "$RoomsBooked"},
        {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},
        {$project: {scheduID:'$RoomsBooked.scheduleID',_id:0}}
    ])
    //res.json({data:test3.pop().scheduID})


    // const m = user.updateOne({
    //     userID : 3,
    //     'rooms.id': 1, 'rooms.schedule.scheduleID' : 1},
    //     {$set :{"rooms.$.schedule.resrved":false}},{multi : true}
        


    // )
    

    const f =await user.findOneAndUpdate({
        // 'userID' : test1.pop().cospaceID,
        // 'rooms.id' : test2.pop().roomid,
        // 'rooms.schedule.id' : test3.pop().scheduID},

        'userID' : 3},
    
    {
        $set : {'rooms.$[i].schedule.$[j].reserved' : false, 'rooms.$[i].schedule.$[j].reservedBy' : {}}
    },
    {
        arrayFilters : [{"i.id" : test2.pop().roomid},{"j.id" : test3.pop().scheduID}]
    }
    
    )
    //res.send("")
    ////user.update({userID : 3,"rooms.schedule":{$elemMatch : {id:1}},"rooms.0.schedule": {$elemMatch: {id: 1}}}, {$set: {"rooms.0.schedule.$.reserved": false}})
    

    // await user.update(
    //         {userID : 3},
    //         {$pull : {rooms :{schedule: {id : 1}}}},{multi : true})

    // await user.update(
    //     {userID : 3},
    //     {$addToSet : {rooms: {schedule : {id : 1,Date:"2019-09-04T22:00:00.000+00:00",time:7,reserved:false, reservedBy:{}}}}}
    // )

    // res.send("m")


    const y =await user.update(
        {userID : parseInt(req.params.userID)},
        {$pull : {RoomsBooked : {bookingID : objectid(req.params.bookingID),}}},{multi : true}, async function(err, model){
               
            if(err)  return handleError(res, err)
            else {
                
                res.json({msg:'reservation was deleted successfully'})
        }
         });


        //  }
        // catch(error) {
        //     // We will be handling the error later
        //     console.log(error)
      //  }  
    // const temp = RoomBookings.find(c => c.userID === parseInt(req.params.userID));
    // const book = temp.bookings;
    // const temp2 = book.find(r => r.bookingID === parseInt(req.params.bookingID));

    // if(!temp2){
    //     res.status(404).send('The room with the given id is not found');
    //     return;
    // };
    // let h = PartnerCoworkingSpace.find(p => p.id === parseInt(temp2.coworkingSpaceID)).rooms.find(s => s.id 
    //     === parseInt(temp2.roomID)).schedule.find(r =>r.id === parseInt(temp2.scheduleID));
    // h.reserved = false;
    // const index = book.indexOf(temp2);

    // book.splice(index,1)

     //res.send("deleted suucc")
});


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



router.get('/RoomBookings/:userID' ,async (req, res)=>{
	var RB = RoomBookings.find(p => p.userID === parseInt(req.params.userID));
    if(!RB){
        res.status(404).send('This user has no bookings');

    await user.find({userID : userID},{RoomsBooked : 1, _id :0},(err, roombookings)=>{

        res.send(roombookings);
    })
  

//get a room in a specific coworking space by id
router.get('/cospace/:id/rooms/:id2' ,(req, res)=>{
    try{
    var scheduleroom = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.id)).rooms.find(s => s.id === parseInt(req.params.id2));
    if(!scheduleroom){
        res.status(404).send('The room with the given id is not found');
        return;
    }
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


module.exports = router
