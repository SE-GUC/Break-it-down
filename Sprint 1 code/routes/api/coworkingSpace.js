const express = require('express')
const router = express.Router()
const Joi = require('joi');
const users = require('../../models/UserProfile');
const validator = require('../../validations/CoworkingSpaceValidations')
const Room = require('../../models/Room')
var objectid = require('mongodb').ObjectID

//const Json = require('json')
<<<<<<< HEAD


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

=======
const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');
const validator = require('../../validations/validations')
const User = require('../../models/UserProfile');

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
>>>>>>> 7a07011ccde3696cb3c8ca6261149b40b472ebc9

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

    



 module.exports = router;
<<<<<<< HEAD

=======
>>>>>>> 7a07011ccde3696cb3c8ca6261149b40b472ebc9

