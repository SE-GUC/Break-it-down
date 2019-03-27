
//const Json = require('json');

const express = require('express')
const router = express.Router()
const users = require('../../models/UserProfile');
const validator = require('../../validations/validations')
const Room = require('../../models/Room')
const Schedule = require('../../models/Schedule')
const validatorSchedule = require('../../validations/ScheduleValidate')
const validatorRoom = require('../../Validations/RoomValudate')

// View a room schedule OK  //TESTED
router.get('/:idC/:idR', async (req,res)=>{
    try{
    const cospace= await users.findOne({type:"coworkingSpace",_id:parseInt(req.params.idC)})
    if(cospace===undefined || cospace.length==0)  return res.send('Coworking Space not found.')

    
    const requestedSchedule = await users.aggregate([
        {$unwind: "$rooms"},
        {$match: {_id:parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
        {$project: {"rooms.schedule": 1, _id:0}}
    ])

if(requestedSchedule===undefined || requestedSchedule.length==0) return res.send('No schedule is allocated for this room yet.')
else return res.status(200).send(requestedSchedule)
    
    }
    catch(error) {
        // We will be handling the error later
        res.send(error)
    }  

});



//Create a new schedule for a room OK // TESTED
router.post('/createSchedule/:idC/:idR', async (req,res)=>{
    try{
    
    const isValidated = validatorSchedule.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    //var idNum = parseInt(objectId.valueOf(), 16);
    const cospace= await users.findOne({type:"coworkingSpace",'_id':parseInt(req.params.idC)})
    if(cospace===undefined || cospace.length==0)  return res.send('Coworking Space not found.')

    const requestedRoom = await users.aggregate([
        {$unwind: "$rooms"},
        {$match: {_id:parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
        {$project: {"rooms": 2,"name":1, _id:0}}
    ])
    
    if(requestedRoom===undefined || requestedRoom.length==0)  return res.send('Requested room is not found.')

    const newSchedule = {id: req.body.idS, Date: req.body.Date, time: req.body.time, reserved: false}
    //const newSchedule = await Schedule.create(req.body)
    users.findOneAndUpdate({'_id':parseInt(req.params.idC), 'rooms.id':parseInt(req.params.idR)}, {$push: {rooms: {schedule: newSchedule}}}, {new: true}, (err, cospaceRooms) => {
        if (err) {
            res.json("Something wrong when updating data!");
        }
    
        res.json({msg:'Schedule was created successfully', data: newSchedule})
    });
  
    }
      catch(error) {
        // We will be handling the error later
      console.log(error)
    }  
});




//Delete a schedule //TESTED

router.delete('/:idC/:idR/:idS', async (req, res) => {
    try{

        const idc = parseInt(req.params.idC)
        const idr = parseInt(req.params.idR)
        const ids = parseInt(req.params.idS)

        const cospace = await users.find({type:"coworkingSpace",'_id':parseInt(req.params.idC)})
        if(cospace===undefined || cospace.length==0) return res.send({error:'Coworking space does not exist.'})
  
    const requestedRoom = await users.aggregate([
        {$unwind: "$rooms"},
        {$match: {_id:idc, type:"coworkingSpace","rooms.id":idr}},
        {$project: {"rooms": 2,"name":1, _id:0}}
    ])
    if(requestedRoom===undefined || requestedRoom.length==0) return res.send({error:'Room does not exist.'})
 
        users.update( {'_id': idc, 'rooms.id': idr, 'rooms.schedule.id': ids}, 
            { $pull: {'rooms.$.schedule':{id:ids}} }, async function(err, model){
               
           if(err)  return res.send(err)
           else res.json({msg:'Schedule was deleted successfully', data: model})
        });   


  }
    catch(error) {
    // We will be handling the error later
    console.log(error)
}  
});



router.put('/:idC/:idR/:idS' ,async(req, res)=>{
    try{
    const schedID = req.params.idS;
    const idc = parseInt(req.params.idC)
    const idr = parseInt(req.params.idR)
    const ids = parseInt(req.params.idS)
    
    var cospace = await users.findOne({type:"coworkingSpace",'_id':parseInt(req.params.idC)})
    if(cospace===undefined || cospace.length==0) return res.send({error:'Coworking space does not exist.'})


    var scheduleroom  = await users.aggregate([
        {$unwind: "$rooms"},
        {$match: {_id:parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
        {$project: {"rooms": 1, _id:0}}
      ])

    if(scheduleroom ===undefined || scheduleroom .length==0) return res.send({error:'Room does not exist.'})
    const requestedSchedule = await users.aggregate([
        {$unwind: "$rooms"},
        {$match: {_id:parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
        {$project: {"rooms.schedule": 1, _id:0}}
    ])
   /* const newArray = requestedSchedule.filter(function(item) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
              if(property.id===ids)
              return property.reserved
            }
          }
          res.json(newArray)

     const test1 = await users.aggregate([
        {$unwind: "$rooms"},
        {$unwind: "$rooms.schedule"},
        {$match: {_id:parseInt(req.params.idC),type:"coworkingspace",'rooms.id':parseInt(req.params.idR),'rooms.schedule.id':parseInt(schedID)}},
        {$project:{"rooms":1,_id:0}}
    ])
return res.json(test1)*/

   // if(test1===undefined || test1.length==0) res.json(test1)
   // if(test1.pop().reserved) res.json({error:'already reserved'})
 
 
  users.update( {'_id': idc, 'rooms.id': idr, 'rooms.schedule.id': ids}, 
  { $set: {'rooms.$.schedule':{reserved:true}} }, async function(err, model){
     
   if(err)  res.json(err)
   else res.json({msg:'Schedule was booked successfully', data: model})
   });   

     }
   catch(error) {
        // We will be handling the error later
        console.log(error)
    }  

});


module.exports = router;

