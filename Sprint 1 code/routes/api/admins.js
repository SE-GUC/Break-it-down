const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')

const validator = require('../../validations/updateValidations')

// We will be connecting using database 

const Admin = require('../../models/Admin')

const User = require('../../models/UserProfile')

const Partners = require('../../models/Partner');

const Members = require('../../models/Member')

const Joi = require('joi');

//------------------------------nourhan--------------------------------------------
var bodyParser = require('body-parser')

//var mongoose = require('mongoose');

const Message = require('../../models/Message')
const message = require('../../models/messages');
var http = require('http').Server(router);

var io = require('socket.io')(http);

var path = require('path');


//updates array in database has id of update, updated attributes  *tested*
router.get('/viewUpdates', async (req, res) => {
    const updt=await User.find()
    res.json({ data: updt })
})
//id is the user id, uid is the id of the update, why does it delete      *tested*
router.put('/approveUpdates/:id/:uid',async (req,res)=>{
     try {
         const userid=parseInt(req.params.id)

         const updtid=parseInt(req.params.uid)

         const user= await User.findById(userid)
         if(!user)return res.status(404).send({error: 'User does not exist'})

        const update=await User.find({'_id':userid,'updates._id':updtid},{'updates':1})
        if(!update || !update[0] || !update[0].updates[0])return res.status(404).send({error: 'Update does not exist'})

        const newUser={'type':(update[0].updates[0].type===undefined?user.type:update[0].updates[0].type),
                        'name':(update[0].updates[0].name===undefined?user.name:update[0].updates[0].name),
                        'password':(update[0].updates[0].password===undefined?user.password:update[0].updates[0].password),
                        'email':(update[0].updates[0].email===undefined?user.email:update[0].updates[0].email),
                        'phoneNumber':(update[0].updates[0].phoneNumber===undefined?user.phoneNumber:update[0].updates[0].phoneNumber),
                        'field':(update[0].updates[0].field===undefined?user.field:update[0].updates[0].field),
                        'memberTasks':(update[0].updates[0].memberTasks===undefined?user.memberTasks:update[0].updates[0].memberTasks),
                        'activation':(update[0].updates[0].activation===undefined?user.activation:update[0].updates[0].activation),
                        'address':(update[0].updates[0].address===undefined?user.address:update[0].updates[0].address),
                        'birthday':(update[0].updates[0].birthday===undefined?user.birthday:update[0].updates[0].birthday),
                        'skills':(update[0].updates[0].skills===undefined?user.skills:update[0].updates[0].skills),
                        'interests':(update[0].updates[0].interests===undefined?user.interests:update[0].updates[0].interests),
                        'accomplishments':(update[0].updates[0].accomplishments===undefined?user.accomplishments:update[0].updates[0].accomplishments),
                        'trainers':(update[0].updates[0].trainers===undefined?user.trainers:update[0].updates[0].trainers),
                        'trainingPrograms':(update[0].updates[0].trainingPrograms===undefined?user.trainingPrograms:update[0].updates[0].trainingPrograms),
                        'partners':(update[0].updates[0].partners===undefined?user.partners:update[0].updates[0].partners),
                        'boardMembers':(update[0].updates[0].boardMembers===undefined?user.boardMembers:update[0].updates[0].boardMembers),
                        'events':(update[0].updates[0].events===undefined?user.events:update[0].updates[0].events),
                        'reports':(update[0].updates[0].reports===undefined?user.reports:update[0].updates[0].reports),
                        'tasks':(update[0].updates[0].tasks===undefined?user.tasks:update[0].updates[0].tasks),
                        'certificates':(update[0].updates[0].certificates===undefined?user.certificates:update[0].updates[0].certificates),
                        'website':(update[0].updates[0].website===undefined?user.website:update[0].updates[0].website),
                        'description':(update[0].updates[0].description===undefined?user.description:update[0].updates[0].description),
                        'facilities':(update[0].updates[0].facilities===undefined?user.facilities:update[0].updates[0].facilities),
                        'rooms':(update[0].updates[0].rooms===undefined?user.rooms:update[0].updates[0].rooms)}
        
        const updatedUser=await User.update({'_id':userid},{$set:{type:newUser.type,name:newUser.name,password:newUser.password,
        email:newUser.email,phoneNumber:newUser.phoneNumber,field:newUser.field,memberTasks:newUser.memberTasks,
        activation:newUser.activation,address:newUser.address,birthday:newUser.birthday,skills:newUser.skills,
        interests:newUser.interests,accomplishments:newUser.accomplishments,trainers:newUser.trainers,
        trainingPrograms:newUser.trainingPrograms,partners:newUser.partners,boardMembers:newUser.boardMembers,events:newUser.events,
        reports:newUser.reports,tasks:newUser.tasks,certificates:newUser.certificates,website:newUser.website,
        description:newUser.description,facilities:newUser.facilities,rooms:newUser.rooms}})

        const approve=await User.update( { '_id':userid,'updates._id':updtid}, {$pull: {updates:{_id:updtid}}});
    
         res.json({msg: 'User updated successfully'})
        }
        catch(error) {
            // We will be handling the error later
            console.log(error)  
        }  
});

//id is the user id, uid is the id of the update    *tested*
router.delete('/disapproveUpdates/:id/:uid',async(req,res)=>{
     try {
            const userid=parseInt(req.params.id)

            const updtid=parseInt(req.params.uid)

            const user= await User.findById(userid)
            if(!user)return res.status(404).send({error: 'User does not exist'})

            const update=await User.find({'updates._id':updtid},{'updates':1})
            if(!update)return res.status(404).send({error: 'Update does not exist'})

            const del=await User.update( { '_id':userid,'updates._id':updtid}, {$pull: {updates:{_id:updtid}} } );
    
            res.json({msg: 'Sorry your update request was disapproved by an admin'})
       
           }catch(error) {
       
               // We will be handling the error later
       
               console.log(error)
       
           }  
});




//--------------------------------------------------------------------------------------





// //--------------------------- admin check task description --------------------------------------------- LINA



router.get('/:PID/:TID', (req, res)=> {
    const PartID = req.params.PID

    const Part = Partners.find(Partner => Partner.ID === parseInt(PartID))



    const Task_id = req.params.TID

    const Task_Array = Part.Tasks

    const task_to_check = Task_Array.find(Tasks => Tasks.taskID === parseInt(Task_id))





    res.send(task_to_check)

   

});

// //----------------------------get all applicants of a task that belongs to partner----------------------------- Janna

router.get('/viewApplicants/:PID/:TID', (req, res)=> {
    const PartID = req.params.PID

    const Part = Partners.find(Partner => Partner.ID === parseInt(PartID))



    const taskID = req.params.TID

    const janna= Part.Tasks.find(janna => janna.taskID === parseInt(taskID))

    res.send( janna.applicants)

});

 //------------------------------------------------------admin assigning the chosen member by partner-------------------- EMAN



router.put('/assign/:idP/:idT',(req,res)=>{

    const partnerID=parseInt(req.params.idP)

    const partner1= Partners.find(partner1 => partner1.ID === partnerID)

    const taskID=parseInt(req.params.idT)

    const task1= partner1.Tasks.find(task1 => task1.taskID === taskID)

    const index = Partners.indexOf(partner1)

    const index1=partner1.Tasks.indexOf(task1)

    const applicants=Partners[index].Tasks[index1].applicants

    const assigned = req.body.assigned

    const schema = {
        assigned:Joi.boolean().required()
     }

    const result=Joi.validate(req.body,schema)

    if(result.error)

     return res.status(400).send(error.details[0].message);

     const applicant=applicants.filter(applicant=> applicant.accepted===true)

     if(applicant.length==!0){

     const appl=Partners[index].Tasks[index1].applicants.find(appl => appl.accepted === true)

     const applicant2=Partners[index].Tasks[index1].applicants.indexOf(appl)

 

     Partners[index].Tasks[index1].applicants[applicant2].assigned= assigned

     res.send(applicants);}

     else{

         res.send("partner didn't choose or Sorry you already assigning again")

     }

 }); 


//-------------------------- admin post task description ----------------------------------------------- LINA



router.put('/:PID/:TID', (req, res)=> {

    const PartID = req.params.PID

    const Part = Partners.find(Partner => Partner.ID === parseInt(PartID))

    const Task_id = req.params.TID

    const Task_Array = Part.Tasks

    const task_to_post = Task_Array.find(Tasks => Tasks.taskID === parseInt(Task_id))

    const approval = req.body.approval;

    task_to_post.approved= approval;

    if(approval === true) {
        res.send(task_to_post)
    }else
        res.send('not approved') 

    }
);

      

//----------------------------- admin activate Member's account--------------------------------------------- JANNA


router.put('/:MID', (req, res)=> {

    const MemID = req.params.MID

    const Mem = Members.find(Member => Member.ID === parseInt(MemID))



    const activation = req.body.activation;

    Mem.activated = activation;

    res.send(Mem)

});
//------------------------------------------------------nourhan-----------------------------------------

router.get('/', function(req, res){
    res.sendFile(path.resolve('./index.html'));
  });

  router.get('/sent',(req, res)=>{
    res.sendFile(path.resolve('./index2.html'));
  })

  router.get('/messages', (req, res) => {

    Message.find({},(err, messages)=> {
  
      res.send(messages);
  
    })
  
  })
  


  router.post('/messages', async (req, res) => {
  
    try{
  
      var message = new Message(req.body);
  
  
  
      var savedMessage = await message.save()
  
        console.log('saved');
  
  
  
      var censored = await Message.findOne({message:'badword'});
  
        if(censored)
  
          await Message.remove({_id: censored.id})
  
        else
  
          io.emit('message', req.body);
  
        res.sendStatus(200);
  
    }
  
    catch (error){
  
      res.sendStatus(500);
  
      return console.log('error',error);
  
    }
  
    finally{
  
      console.log('Message Posted')
  
    }
  
  
  
  })
  

  
  
  
  io.on('connection', () =>{
  
    console.log('a user is connected')
  
  })

  router.get('/viewmessages', async (req, res) => {
    const updt=await message.find()
    res.json({ data: updt })
})

//------------------------------------------------------------------------------------------------------

//router.get('/', (req, res) => res.json("admin profile default route"));


module.exports = router
