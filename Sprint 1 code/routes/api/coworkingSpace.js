<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const Joi = require('joi');
//const Json = require('json')
const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');
const validator = require('../../validations/validations')


// View all coworking spaces -tested-
router.get('/', (req, res) => res.json({ data: PartnerCoworkingSpace }));

// View all rooms in a specific coworking space\ View specific coworking spaces OK
router.get('/:idC',(req,res)=>{

      const cospace = PartnerCoworkingSpace.find(c=>c.id===parseInt(req.params.idC))
      if(!cospace) return res.json('Coworking space does not exist')
      res.json({ data: cospace })
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

    

 module.exports = router;
=======
>>>>>>> 9adc7e25dd5c66e89364810d2c3e7f44dfd034e3

