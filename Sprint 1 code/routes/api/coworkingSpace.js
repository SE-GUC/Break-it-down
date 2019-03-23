const express = require('express')
const router = express.Router()
const Joi = require('joi');
//const Json = require('json')
const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');
const validator = require('../../validations/validations')
const User = require('../../models/UserProfile');

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
          
         
          res.json({ data: Users })
      });
/// View a specific room -tested-
router.get('/:idC/:idR',(req,res)=>{
    const cospace =PartnerCoworkingSpace.find(p=>p.id===parseInt(req.params.idC))

    if(!cospace) return res.send('Coworking Space not found.')
    
    const requestedRoom = cospace.rooms.find(r=>r.id === parseInt(req.params.idR))
    
    if(!requestedRoom) return res.send('No room with this id is found.')
    
    res.json(requestedRoom)

});

/// Create a room -tested-
router.post('/', async (req,res) => {
    try {
    
     const idC = req.body.idC
     const id = req.body.idR
     const capacity = req.body.capacity
     const schedule = req.body.schedule

     //const { idC, id, capacity, schedule }  = req.body
     var  cospace= PartnerCoworkingSpace.find(c=>c.id===parseInt(idC))
     if(!cospace) return res.send({error:'Coworking space does not exist.'})

     const room = cospace.rooms.find(r=>r.id===parseInt(id))

   //  if(room) return res.status(400).json({error: 'Room already exists'})

     const schema = {
         idC: Joi.number().required(),
         id:Joi.number().required(),
        capacity: Joi.number().min(65).required(),
        schedule: Joi.array().items(Joi.string()) 

     }
    const result = Joi.validate(req.body, schema);
    if(result.error){
      return  res.status(400).send(result.error.details[0].message)
     }
     var newRoom = {id: id, capacity: capacity, schedule: schedule}
     cospace.rooms.push(newRoom)
     res.json({msg:'Room was created successfully', data: newRoom})
     
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
});

//Update coworking space name   -tested-
router.put('/', (req, res)=>{
    try
    {
        const schema={
            idC: Joi.number().required(),
            name: Joi.string().required()
        }
        const result = Joi.validate(req.body, schema);

        if(result.error){
            return res.status(400).send(result.error.details[0].message)
        }

        var cospace = PartnerCoworkingSpace.find(p => p.id === parseInt(req.body.idC))
        if(!cospace) return res.send({error: 'Coworking space does not exist'})
        cospace.name=req.body.name
       return res.json({msg:'Coworking space name is successfully updated.', data: cospace})

    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
});

router.delete('/:id/:idr', (req, res) => {
    const cospaceID = parseInt(req.params.id) 
    const roomID=parseInt(req.params.idr)
    const cospace = PartnerCoworkingSpace.find(cospace => cospace.id === cospaceID)
    
    const room=cospace.rooms.find(room => room.id === roomID)
  
    const index = cospace.rooms.indexOf(room)
    cospace.rooms.splice(index,1)
    res.json(cospace.rooms)
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


