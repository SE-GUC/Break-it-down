const express = require('express')
const router = express.Router()

const Joi = require('joi');
//const Json = require('json');


const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');
const validator = require('../../validations/validations')


// View a room schedule OK
router.get('/:idC/:idR',(req,res)=>{
    const cospace=PartnerCoworkingSpace.find(p=>p.id===parseInt(req.params.idC))
    if(!cospace)  return res.send('Coworking Space not found.')
    const requestedRoom = cospace.rooms.find(r=>r.id === parseInt(req.params.idR))
    if(!requestedRoom)  return res.send('No room with this id is found.')
    const roomSchedule= requestedRoom.schedule
   
    res.json({data: roomSchedule})

});

//Create a new schedule for a room OK
router.post('/',(req,res)=>{
    const cospace=PartnerCoworkingSpace.find(p=>p.id===parseInt(req.body.idC))
    if(!cospace)  return res.send('Coworking Space not found.')

    const requestedRoom = cospace.rooms.find(r=>r.id === parseInt(req.body.idR))
    
    if(!requestedRoom)  return res.send('No room with this id is found.')

    var roomSchedule= requestedRoom.schedule
    const schema={
        idC: Joi.number().required(),
        idR: Joi.number().required(),
        idS: Joi.number().required(),
        Date: Joi.date().required(),
        time: Joi.number().required()

    }
    const result = Joi.validate(req.body, schema);
    if(result.error){
      return  res.send(result.error.details[0].message)
     }

    const newSchedule = {id: req.body.idS, user: {}, Date: req.body.Date, time: req.body.time, reserved: false}
    
    roomSchedule.push(newSchedule)

    res.json({data: roomSchedule})

});



 // Reserve a room /UUpdate this room's schedule reservation   -tested-
 router.put('/:idC/:idR/:idS/:id' ,(req, res)=>{
    try{
       const schema = {
           idC: Joi.number().required(),
           idR: Joi.number().required(),
           idS: Joi.number().required(),
           user: Joi.object().required()
       };
       const result = Joi.validate(req.body, schema);

       if(result.error){
           return res.status(400).send(result.error.details[0].message)
       }

       const userSchema = {
           name: Joi.string().required(),
           id: Joi.number().required(),
           field: Joi.string(),
           MemberTasks: Joi.array()
       
        }
       
        const result2 = Joi.validate(req.body.user, userSchema);

       
        if(result2.error){
           return res.status(400).send(result2.error.details[0].message)
       }
   var cospace = PartnerCoworkingSpace.find(p => p.id === parseInt(req.body.idC))
   if(!cospace){
    return res.status(404).send('Coworking space does not exist');
       
   };
   
   var scheduleroom = cospace.rooms.find(s => s.id === parseInt(req.body.idR));
   if(!scheduleroom){
      return res.status(404).send('Room does not exist.');
       
   };
    
   var scheduleOfRoom = scheduleroom.schedule.find(s => s.id === parseInt(req.body.idS));;
   if(!scheduleOfRoom){
       return res.status(404).send('This schedule is not assigned to this room.');
        
    };
 
   if(scheduleOfRoom.reserved===true){
       if(scheduleOfRoom.user.ID===parseInt(req.params.id)) return res.send({error: 'You already reserved this room.', data: scheduleOfRoom})
       else if(scheduleOfRoom.user.ID!==parseInt(req.params.id)) return res.send({error: 'This is a reserved time slot. Choose another one.'})
   }
   else if(scheduleOfRoom.reserved===false){
       scheduleOfRoom.reserved=true
       scheduleOfRoom.user.name=req.body.user.name
       scheduleOfRoom.user.ID =parseInt(req.body.user.id)
       scheduleOfRoom.user.field = req.body.user.field
       scheduleOfRoom.user.MemberTasks = req.body.user.MemberTasks
       return res.send({message:'Room is successfully reserved.', data: scheduleOfRoom})
   }
}
catch(error) {
   // We will be handling the error later
   console.log(error)
}  
});





//Delete a schedule OK
router.delete('/:idC/:idR/:idS', (req, res) => {
   
    var cospace = PartnerCoworkingSpace.find(p => p.id === parseInt(req.params.idC))
   if(!cospace){
    return res.status(404).send('Coworking space does not exist');
       
   };
   
   var scheduleRoom = cospace.rooms.find(s => s.id === parseInt(req.params.idR));
   if(!scheduleRoom){
      return res.status(404).send('Room does not exist.');
       
   };
    
   var scheduleOfRoom = scheduleRoom.schedule.find(s => s.id === parseInt(req.params.idS));;
   if(!scheduleOfRoom){
       return res.status(404).send('This schedule is not assigned to this room.');
        
    }; 
    if(scheduleOfRoom.reserved===true){
        return res.send({message: 'Action can not be made as this slot is reserved. Try again after reservation duration ends.'})
    }
  
    const index = scheduleRoom.schedule.indexOf(scheduleOfRoom)
    scheduleRoom.schedule.splice(index,1)
    res.json({message: 'Schedule successfully deleted', data: scheduleRoom})
});


module.exports = router;

