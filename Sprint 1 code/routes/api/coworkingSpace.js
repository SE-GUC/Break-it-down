const express = require('express')
const router = express.Router()
const Joi = require('joi');
const users = require('../../models/UserProfile');
const mongoose = require('mongoose')
const User = require('../../models/UserProfile')
const validator = require('../../validations/CoworkingSpaceValidations')
const Room = require('../../models/Room')
var objectid = require('mongodb').ObjectID

//const Json = require('json')



// View all coworking spaces -tested- ///TESTED
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
//View specific coworking spaces OK  /// TESTED 
router.get('/:idC', async (req,res)=>{
    try{

      const cospace = await users.findOne({type:"coworkingSpace",'_id':parseInt(req.params.idC)})
      if(cospace===undefined || cospace.length==0) return res.json('Coworking space does not exist')
      res.json({ data: cospace })
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
  });


const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');





// View all coworking spaces -tested- MONGOUPDATED
router.get('/', async (req,res) => {
	const coworkingSpace = await PartnerCoworkingSpace.find()
	res.json({data: coworkingSpace})
})


  // Create a new PartnerCoworkingSpace (Malak&Nour) MONGOUPDATED
router.post('/pcs', async(req, res) => {
    const {type,name,email ,address ,phoneNumber ,description, facilities,rooms }=req.body
    const CoworkingSpace = await PartnerCoworkingSpace.findOne({email})
    if(CoworkingSpace) return res.status(400).json({error: 'Email already exists'})
    
        const newPartnerCoworkingSpace = new PartnerCoworkingSpace({
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
router.put('/:id', async (req,res) => {
	try {
	 const id = req.params.id
     const CoworkingSpace = await PartnerCoworkingSpace.findOne({id})
    // if(!CoworkingSpace) return res.status(404).send({error: 'PartnerCoworkingSpace does not exist'})
	// const isValidated = validator.updateValidation(req.body)
	 //if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     
     const updatedPartnerCoworkingSpace = await PartnerCoworkingSpace.updateOne(req.body)

	 res.json({msg: 'CowrkingSpace updated successfully'})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})

// Delete PartnerCoworkingSpace (Malak&Nour) MONGOUPDATED
router.delete('/:id', async (req,res) => {
	try {
	 const id = req.params.id
	 const deletedPartnerCoworkingSpace = await PartnerCoworkingSpace.findByIdAndRemove(id)
	 res.json({msg:'PartnerCoworkingSpace was deleted successfully', data: deletedPartnerCoworkingSpace})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})
  




// View all coworking spaces -tested-
router.get('/',async (req, res) =>{
    const Users = await User.find({type:'coworkingspace'})
     res.json({ data: Users })
    });
    
    
    // View all rooms in a specific coworking space\ View specific coworking spaces OK
    router.get('/:idC',async(req,res)=>{
    
          const Users =await User.find({type:'coworkingspace',userID:parseInt(req.params.idC)})          
          if({Users:[]}) return res.json('Coworking space does not exist')
          res.json({ data: Users })
      });
/// View a specific room -tested-
router.get('/:idC/:idR',(req,res)=>{
    const cospace =PartnerCoworkingSpace.find(p=>p.id===parseInt(req.params.idC))


/// View a specific room OK /// TESTED
router.get('/:idC/:idR', async (req,res)=>{
    try{
    const cospace = await users.findOne({type:"coworkingSpace",'_id':parseInt(req.params.idC)})
    

    if(cospace===undefined || cospace.length==0) return res.send('Coworking Space not found.')
    
    const requestedRoom = await users.aggregate([
        {$unwind: "$rooms"},
        {$match: {_id:parseInt(req.params.idC), type:"coworkingSpace","rooms.id":parseInt(req.params.idR)}},
        {$project: {"rooms": 1, _id:0}}
    ])
       
    if(requestedRoom===undefined || requestedRoom.length==0) return res.send('No room is found.')
    
    res.json(requestedRoom)
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
});



/// Create a room OK //TESTED
router.post('/createRoom', async (req,res) => {
    try {
    
     const idR = req.body.idR
     const capacity = req.body.capacity
     const schedule = req.body.schedule
     var  cospace= await users.find({'_id':parseInt(req.body.idC)})
     if(cospace===undefined || cospace.length==0) return res.send({error:'Coworking space does not exist.'})

   //Room validation 
     const schema = {
         idC: Joi.number().required(),
         idR:Joi.number().required(),
         capacity: Joi.number().min(65).required(),
         schedule: Joi.array()

     }
    const result = Joi.validate(req.body, schema);
    if(result.error){
      return  res.status(400).send(result.error.details[0].message)
     }
     const newRoom = await Room.create(req.body)
     User.findOneAndUpdate({'_id':req.body.idC}, {$push: {rooms: newRoom}}, {new: true}, (err, cospaceRooms) => {
        if (err) {
            res.json("Something wrong when updating data!");
        }
    
        res.json({msg:'Room was created successfully', data: newRoom})
    });
  
}
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
});



//Update coworking space   // TESTED
router.put('/updateCospace/:idC', async (req, res)=>{
    try
    {
      //  const id = parseInt(req.params.idC)
        
        const cospace = await users.find({type:"coworkingSpace",'_id':parseInt(req.params.idC)})
        if(cospace===undefined || cospace.length==0) return res.status(404).send({error: 'Coworking Space does not exist'})

        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        

       await users.updateOne(
            {type:"coworkingSpace",'_id':parseInt(req.params.idC)},
            req.body,
            {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            
                console.log(doc);
            });

    res.json({msg:'Coworking space was updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
})



//Delete a room  //TESTED
router.delete('/:idC/:idR', async (req, res) => {
    try{

    const cospace = await users.find({type:"coworkingSpace",'_id':parseInt(req.body.idC)})
    if(cospace===undefined || cospace.length==0) return res.send({error:'Coworking space does not exist.'})
        const requestedRoom = await users.aggregate([
        {$unwind: "$rooms"},
        {$match: {_id:parseInt(req.body.idC), type:"coworkingSpace","rooms.id":parseInt(req.body.idR)}},
        {$project: {"rooms": 2,"name":1, _id:0}}
    ])

    users.update( {_id: req.body.idC}, { $pull: { rooms: {id:req.body.idR} } }, async function(err, model){
               
           if(err)  res.json(error)
           else res.json({msg:'Room was deleted successfully'})
        });   
  }
    catch(error) {
    // We will be handling the error later
    console.log(error)
}  
});


//Update coworking space booking, to request a larger room   *Needs reviewing when updating mongodb*
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

        if(!room) return res.json({msg:'Could not find an empty room with the desired capacity in the same coworking space'})
    
        const updtbooking=await User.update({'RoomsBooked.bookingID':bookingID}, {$set:{RoomsBooked:{roomID:room.rooms[0].id}}});

        const updtOldRoom=await User.update({'rooms.id':booking[0].RoomsBooked[0].roomID,
        'rooms.schedule.Date':booking[0].RoomsBooked[0].Date},{$set:{rooms:{schedule:{reserved:false}}}})

        const updtNewRoom=await User.update({'rooms.id':room.rooms[0].id,
        'rooms.schedule.Date':booking[0].RoomsBooked[0].Date},{$set:{rooms:{schedule:{time:booking[0].RoomsBooked[0].time}},
        rooms:{schedule:{userID:booking[0]._id}}, rooms:{schedule:{Date:booking[0].RoomsBooked[0].Date}}, rooms:{schedule:{reserved:true}}}});
      
        res.json({msg:'Your room booking is successfully updated.', data: cospace})

    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
});


//view suggestions of coworking spaces when creating an event,depending on capacity,location and event time  *tested*
//get only empty rooms?
router.get('/CoworkingSpace/Suggestions/:eid', async (req, res) => {
    try{
    const eventid=parseInt(req.params.eid)

    const event=await User.find({'events.id':eventid},{events:{$elemMatch:{id:eventid}}})

    const suggestions=await User.find({'rooms.capacity':{$gte:event[0].events[0].capacity},
    'rooms.schedule.Date':event[0].events[0].date,'rooms.schedule.time':event[0].events[0].time,'rooms.schedule.reserved':false,
    'address':event[0].events[0].location},
    {name:1,email:1,address:1,website:1,phoneNumber:1,description:1,facilities:1,rooms:1})

    res.json(suggestions)
 
    }catch(error){
        console.log(error)
    }
})

//view suggestions of coworking spaces when creating an event,depending on capacity,location and event time  *tested*
//get only empty rooms?
router.get('/CoworkingSpace/Suggestions/:eid', async (req, res) => {
    try{
    const eventid=parseInt(req.params.eid)

    const event=await User.find({'events.id':eventid},{events:{$elemMatch:{id:eventid}}})

    const suggestions=await User.find({'rooms.capacity':{$gte:event[0].events[0].capacity},
    'rooms.schedule.Date':event[0].events[0].date,'rooms.schedule.time':event[0].events[0].time,'rooms.schedule.reserved':false,
    'address':event[0].events[0].location},
    {name:1,email:1,address:1,website:1,phoneNumber:1,description:1,facilities:1,rooms:1})

    res.json(suggestions)
 
    }catch(error){
        console.log(error)
    }
})

    



 module.exports = router;

