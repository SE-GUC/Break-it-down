//--------------------express--------------------
const express = require('express')
const router = express.Router()

const Joi = require('joi');
const validator = require('../../validations/CoworkingSpaceValidations');
const validatorSchedule = require('../../Validations/ScheduleValidate')
//--------------------models--------------------
const users = require('../../models/UserProfile');
const User = require('../../models/UserProfile')
const Room = require('../../models/Room');
const Schedule = require('../../models/Schedule')
const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');


//---------------------------------Mariam------------------------------------------------------------------------

// View all coworking spaces  TESTED ..
router.get('/viewCoworkingSpace', async (req, res) => {
try{
const coworkingSpace = await users.find({type:"coworkingSpace"})
res.json({ data: coworkingSpace });
}
catch(error) {
// We will be handling the error later
console.log(error)
}  
})

// View all rooms in a specific coworking space
//View specific coworking spaces   TESTED  ..
router.get('/viewCospace/:idC', async (req,res)=>{
try{

const cospace = await users.findOne({type:"coworkingSpace",'userID':parseInt(req.params.idC)})
if(cospace===undefined || cospace.length==0) return res.json('Coworking space does not exist')
res.json(cospace)
}
catch(error) {
res.json({error: "No coworking spaces available yet."})
}   
});




// View all rooms in a specific coworking space\ View specific coworking spaces OK //Tested ..
/*router.get('/viewAllRooms/:idC',async(req,res)=>{ 
try{
    const rooms =await users.find({type:'coworkingSpace','userID':parseInt(req.params.idC)})          
    if(rooms===undefined || rooms.length==0) return res.json('Coworking space does not exist')
    res.json({ data: rooms})
}
catch(error){
    res.json({error: "Coworking space does not exist."})
}
});*/


/// View a specific room OK /// TESTED  ---
router.get('/viewRoom/:idC/:idR', async (req,res)=>{
try{
const cospace = await users.findOne({type:"coworkingSpace",'userID':parseInt(req.params.idC)})


if(cospace===undefined || cospace.length==0) return res.send('Coworking Space not found.')

const requestedRoom = await users.aggregate([
{$unwind: "$rooms"},
{$match: {'userID':parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
{$project: {"rooms": 1, _id:0}}
])

if(requestedRoom===undefined || requestedRoom.length==0) return res.send('No room is found.')

res.json(requestedRoom)
}
catch(error) {
res.json({error: "This room does not exist."})
}  
});



//Update coworking space   // TESTED ...
router.put('/updateCospace/:idC', async (req, res)=>{
try
{
//  const id = parseInt(req.params.idC)

const cospace = await users.findOne({'userID':parseInt(req.params.idC)})
if(cospace===undefined || cospace.length==0) return res.status(404).send({error: 'Coworking Space does not exist'})

const isValidated = validator.updateValidation(req.body)
if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })


const updatedco = await users.updateOne(
    {type:"coworkingSpace",'userID':parseInt(req.params.idC)},
    req.body,
    {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });

res.json({msg:'Coworking space was updated successfully', data: updatedco})
}
catch(error) {
res.json({msg: 'Failed to update coworking space.'})
}  
})

//---------------------------------------COSPACE 2-----------------------------------------------------------

// View a room schedule TESTED  ...
router.get('/viewRoomSchedule/:idC/:idR', async (req,res)=>{
try{
const cospace= await users.findOne({type:"coworkingSpace",'userID':parseInt(req.params.idC)})
if(cospace===undefined || cospace.length==0)  return res.send('Coworking Space not found.')


const requestedSchedule = await users.aggregate([
{$unwind: "$rooms"},
{$match: {'userID':parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
{$project: {"rooms.schedule": 1, _id:0}}
])


if(requestedSchedule===undefined || requestedSchedule.length==0) return res.send('No schedule is allocated for this room yet.')
else return res.status(200).send(requestedSchedule)

}
catch(error) {
    res.json({msg:"This schedule does not exist."})
}  

});

// Create a room TESTED  ...
router.post('/createRoom/:idC', async (req,res) => {
try {

var  cospace= await users.find({'userID':parseInt(req.params.idC)})
if(cospace===undefined || cospace.length==0) return res.send({error:'Coworking space does not exist.'})

//Room validation 
const schema = {
    id:Joi.number().required(),
    capacity: Joi.number().min(65).required(),
    schedule: Joi.array()

}
const result = Joi.validate(req.body, schema);
if(result.error){
return  res.status(400).send(result.error.details[0].message)
}
const newRoom = await Room.create(req.body)
User.findOneAndUpdate({'userID':parseInt(req.params.idC)}, {$push: {rooms: newRoom}}, {new: true}, (err, cospaceRooms) => {
if (err) {
    res.json("Something wrong when updating data!");
}

res.json({msg:'Room was created successfully', data: newRoom})
});

}
catch(error) {
res.json({error:"Failed to create the room."});
} 
});

//Delete a room  //TESTED ...
router.delete('/deleteRoom/:idC/:idR', async (req, res) => { 
    try{
    
    const cospace = await users.find({type:"coworkingSpace",'userID':parseInt(req.params.idC)})
    if(cospace===undefined || cospace.length==0) return res.send({error:'Coworking space does not exist.'})
    const requestedRoom = await users.aggregate([
    {$unwind: "$rooms"},
    {$match: {'userID':parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
    {$project: {"rooms": 2,"name":1, _id:0}}
    ])
    
    users.update( {'userID': parseInt(req.params.idC)}, { $pull: { rooms: {id:parseInt(req.params.idR)} } }, async function(err, model){
            
        if(err)  res.json(error)
        else res.status(200).json({msg:'Deleted'})
    });   
    }
    catch(error) {
    res.json(error)
    } 
    });

// ------------- ---------------- ----------------  ---------------------- ---------------- -------------- 

//Create a new schedule for a room TESTED
router.post('/createSchedule/:idC/:idR', async (req,res)=>{
try{

const isValidated = validatorSchedule.createValidation(req.body)
if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

const cospace= await users.findOne({type:"coworkingSpace",'userID':parseInt(req.params.idC)})
if(cospace===undefined || cospace ===null || cospace.length==0)  return res.send('Coworking Space not found.')

const requestedRoom = await users.aggregate([
{$unwind: "$rooms"},
{$match: {'userID':parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
{$project: {"rooms": 1,_id:0}}
])
res.json(requestedRoom)

if(requestedRoom===undefined || requestedRoom===null || requestedRoom.length==0)  return res.send('Requested room is not found.')

const newSchedule = await Schedule.create(req.body) 

users.update( {'userID':parseInt(req.params.idC), 'rooms.id':parseInt(req.params.idR)}, 
    { $push: {'rooms.$.schedule': newSchedule} }, async function(err, model){
        
    if(err)  return res.send(err.message)
    else res.json({msg:'Schedule was created successfully', data:model})
});  


}
catch(error) {
res.json(error.message)
}  
});

//Delete a schedule TESTED
router.delete('/deleteSchedule/:idC/:idR/:idS', async (req, res) => {
try{
const idc = parseInt(req.params.idC)
const idr = parseInt(req.params.idR)
const ids = parseInt(req.params.idS)

const cospace = await users.find({type:"coworkingSpace",'userID':parseInt(req.params.idC)})
if(cospace===undefined || cospace.length==0) return res.send({error:'Coworking space does not exist.'})

const requestedRoom = await users.aggregate([
{$unwind: "$rooms"},
{$match: {'userID':idc, 'type':'coworkingSpace',"rooms.id":idr}},
{$project: {"rooms": 2,"name":1, _id:0}}
])
if(requestedRoom===undefined || requestedRoom.length==0) return res.send({error:'Room does not exist.'})

users.update( {'userID': idc, 'rooms.id': idr, 'rooms.schedule.id': ids}, 
    { $pull: {'rooms.$.schedule':{id:ids}} }, async function(err, model){
        
    if(err)  return res.send(err)
    else res.status(200).json({msg:'Deleted'})
});   

}catch(error) {
    res.json({msg: "Schedule could not be deleted."})

}
});


//Update room's reservation

router.put('/reserve/:idc/:idr/:ids', async (req,res) => {

try {
const idc=parseInt(req.params.idc);
const idr= parseInt(req.params.idr);
const ids=parseInt(req.params.ids)

const temp = await users.find({'userID':idc});
if(!temp[0])res.send('Coworking space does not exist');
// res.send(temp[0]);
const rooms = temp[0].rooms;
const temp2 =await rooms.find({'rooms.id':idr});
if(!temp2){

res.status(404).send('Room claimed to have this schedule does not exist');

return;

};            

const sch = await users.find({ 'userID':idc,'rooms.id':idr, 'rooms.schedule.id':ids, 'rooms.schedule.reserved':false},
{$set: {'rooms.schedule.$.reserved':true}}, 
function(err, model){});
res.json(sch)

res.send({msg: 'Booking has been successfully made.', data:sch})
}

catch(error) {
    res.json({msg:"Failed to book this schedule.", data:error})
}
});




//----------------------------------------------------------------------------------------------------------------

// View all coworking spaces -tested-
router.get('/ShazaViewAllCospace',async (req, res) =>{
const Users = await User.find({type:'coworkingspace'})
    res.json({ data: Users })
});

// Create a new PartnerCoworkingSpace (Malak&Nour) MONGOUPDATED
router.post('/pcs', async(req, res) => {
const {type,name,email ,address ,phoneNumber ,description, facilities,rooms }=req.body
const CoworkingSpace = await users.findOne({email})
if(CoworkingSpace) return res.status(400).json({error: 'Email already exists'})

const newPartnerCoworkingSpace = new users({
    name,
    email,
    type,
    phoneNumber,
    address,
    description,
    facilities,
    rooms
})
newPartnerCoworkingSpace
.save()
.then(CoworkingSpace => res.json({data :CoworkingSpace}))
.catch(err => res.json({error: 'Can not create PartnerCoworkingSpace'}))
//catch (error){
//console.log("can not create")}
});
// Update PartnerCoworkingSpace (Malak&Nour) done except id non existent case
router.put('/updateCospace2/:id', async (req,res) => {
try {
const id = req.params.id
const CoworkingSpace = await users.findOne({id})
// if(!CoworkingSpace) return res.status(404).send({error: 'PartnerCoworkingSpace does not exist'})
// const isValidated = validator.updateValidation(req.body)
//if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

const updatedPartnerCoworkingSpace = await users.updateOne(req.body)

res.json({msg: 'CowrkingSpace updated successfully', data: CoworkingSpace})
}
catch(error) {
    // We will be handling the error later
    console.log(error)
}  
})

// Delete PartnerCoworkingSpace (Malak&Nour) MONGOUPDATED
router.delete('/deleteCospace/:id', async (req,res) => {
try {
const id = req.params.id
const deletedPartnerCoworkingSpace = await users.findByIdAndRemove(id)
res.json({msg:'PartnerCoworkingSpace was deleted successfully', data: deletedPartnerCoworkingSpace})
}
catch(error) {
    // We will be handling the error later
    console.log(error)
}  
})


//Update coworking space booking, to request a larger room   
router.put('/update/booking/:bid', async(req, res)=>{
    try
    {
        const bookingid=parseInt(req.params.bid);

        const newCapacity=parseInt(req.body.capacity);

        const booking=await User.find({'RoomsBooked.bookingID':bookingid},{RoomsBooked:{$elemMatch:{bookingID:bookingid}}}).lean()

        //find empty room in same coworking space with same date and with specified capacity or greater
        const room= await User.findOne({$and:[{'_id':booking[0].RoomsBooked[0].coworkingSpaceID},
        {'rooms.schedule.reserved':false},{'rooms.schedule.Date':booking[0].RoomsBooked[0].Date},
        {'rooms.capacity':{$gte:newCapacity}},{'rooms.schedule.time':booking[0].RoomsBooked[0].time}]},{rooms:1,_id:0}).lean()

        if(!room || room.length===0)
         return res.status(404).send({error:'Could not find an empty room with the desired capacity in the same coworking space'})
    
        const updtbooking=await User.update({'RoomsBooked.bookingID':bookingID}, {$set:{RoomsBooked:{roomID:room.rooms[0].id}}});

        const updtOldRoom=await User.update({'rooms.id':booking[0].RoomsBooked[0].roomID,
        'rooms.schedule.Date':booking[0].RoomsBooked[0].Date},{$set:{rooms:{schedule:{reserved:false}}}})

        const updtNewRoom=await User.update({'rooms.id':room.rooms[0].id,
        'rooms.schedule.Date':booking[0].RoomsBooked[0].Date},{$set:{rooms:{schedule:{time:booking[0].RoomsBooked[0].time}},
        rooms:{schedule:{userID:booking[0]._id}}, rooms:{schedule:{Date:booking[0].RoomsBooked[0].Date}}, rooms:{schedule:{reserved:true}}}});
      
        res.json({msg:'Your room booking is successfully updated.'})

    }
    catch(error) {
        console.log(error)
    }  
});


//view suggestions of coworking spaces when creating an event,depending on capacity,location and event time  *tested*
//get only empty rooms?
router.get('/CoworkingSpace/Suggestions/:eid', async (req, res) => {
    try{
    const eventid=parseInt(req.params.eid)

    const event=await users.find({'events.id':eventid},{events:{$elemMatch:{id:eventid}}})

    const suggestions=await users.find({'rooms.capacity':{$gte:event[0].events[0].capacity},
    'rooms.schedule.Date':event[0].events[0].date,'rooms.schedule.time':event[0].events[0].time,'rooms.schedule.reserved':false,
    'address':event[0].events[0].location},
    {name:1,email:1,address:1,website:1,phoneNumber:1,description:1,facilities:1,rooms:1})

    if(suggestions.length===0)return res.status(404).send({error: 'No room suggestions found'})

    res.json(suggestions)
 
    }catch(error){
        return res.status(404).send({error: 'No room suggestions found'})
    }
})




module.exports = router;
