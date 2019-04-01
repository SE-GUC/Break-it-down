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

//const express = require('express')
const users = require('../../models/UserProfile')




//------------------------------nourhan--------------------------------------------
var bodyParser = require('body-parser')

//var mongoose = require('mongoose');

const Message = require('../../models/Message')
const message = require('../../models/messages');
var http = require('http').Server(router);

var io = require('socket.io')(http);

var path = require('path');



// temporary data created as if it was pulled out of the database ...

const admins = [

    new Admin(1,'Menna', 'Yasser'),

    new Admin(2,'Reem','Khaled')

];

// const users=[
//     {id:1,firstname:"Nadia",lastname:"Talaat",age:36},
//     {id:2,firstname:"Khaled",lastname:"Tahawi",age:50},
//     {id:3,firstname:"Somaya",lastname:"Afifi",age:60}
// ];

// const updates=[
//     {id:2,firstname:"Yara",status:"pending"},
//     {id:1,lastname:"Khaled",status:"pending"},
//     {id:3,lastname:"Khaled",status:"approved"}

// ];

router.get('/', (req, res) => res.json({ data: admins }));


// router.get('/messages/:user',async (req, res) => {
  
//     var user = req.params.user
  
//     Message.find({name: user},(err, messages)=> {
  
//       res.send(messages);
  
//     })
  
//   })



//----------------------------------------------------------nourhan------------------------------------------------------
router.get('/contact/:pid',async (req, res)=>{

    var partner = parseInt(req.params.pid)
  
    await User.find({userID : partner},{email : 1,phoneNumber:1, _id :0},(err, r)=>{

        res.send(r);
    })
  

})
//--------------------------------------------------------------------------------------------------------------------------



// router.get('/viewUpdates', (req, res) => {
//     const updt=updates.filter(updt=>updt.status==="pending")
// =======
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



//nourhan 
// router.get('/messages/:user',async (req, res) => {
  
//     var user = req.params.user
  
//     Message.find({name: user},(err, messages)=> {
  
//       res.send(messages);
  
//     })
  
//   })
//--------------------------------------------------------------------------------------

//--------------------------- admin check task description ---------------------------------------------

router.get('/CheckTaskDescriptions/:PID/:TID', async(req, res)=> {

    const PartID = parseInt(req.params.PID)
    const partner = await users.findOne({type:"partner",userID:PartID})
    const Task_id = parseInt(req.params.TID)

    if(partner===null) {
        res.send("the database has no partner with the given ID")
   } 
   else {
      const task = partner.tasks
      const task_to_check = task.find(task => task.taskID === Task_id)
      res.send(task_to_check);
   }
     
});
//-------------------------- admin post task on main ----------------------------------------------------------
// partner id and task id are passed to the method to be able to access the required task to be checked  whether its approved or not 
router.put('/ApproveTasks/:PID/:TID', async(req, res)=> {

    const PartID = parseInt(req.params.PID)
    const partner = await users.findOne({type:"partner",userID:PartID})
    const Task_id = parseInt(req.params.TID)

    if(partner===null ) {
        res.json("the database has no partner with the given ID")
   } 
   else {
      const task = partner.tasks
      const task_to_post = task.find(task => task.taskID === Task_id)

      if(task_to_post === null) 
      res.json("this partner has no task with the given ID")

      else{
      const approval = req.body.approval;
  
      users.update({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set: {'tasks.$.approved':approval}}, function(err, model){});
     

      if(approval === true)
      {
     //set life cycle 'posted' stage to true
     users.update({ 'userID':PartID,'tasks.taskID':Task_id}, 
     {$set: {'tasks.$.lifeCycle.0':true}}, function(err, model){});
     
    // const partners = await users.findOne({type:"partner",userID:PartID})

    // res.json(partners)
      }
      else
        { res.json( `${Task_id} not approved`) }
  
    
   }
  
   }


   
});

//----------------------------- admin activate Member's account---------------------------------------------


router.put('/ActivateAccounts/:MID', async (req, res)=> {
    const MemID = parseInt(req.params.MID)
    const member = await users.findOne({type:"member",userID:MemID})

    const activate = req.body.activate 
  
    users.update({'userID':MemID}, 
    {$set: {'activation':activate}}, function(err, model){}); 
 //   const members = await users.findOne({type:"member",userID:MemID})

 //   res.json(members)
});



// //----------------------------get all applicants of a task that belongs to partner----------------------------- Janna

router.get('/viewApplicants/:PID/:TID', (req, res)=> {
    const PartID = req.params.PID

    const Part = Partners.find(Partner => Partner.ID === parseInt(PartID))



    const taskID = req.params.TID

    const janna= Part.Tasks.find(janna => janna.taskID === parseInt(taskID))

    res.send( janna.applicants)

});

//------------------------------------------------------admin assigning the chosen member by partner-------------------- 



router.put('/AssignMember/:idP/:idT', async(req,res)=>{


    const PartID = parseInt(req.params.idP)
    const Task_id = parseInt(req.params.idT)
    const partner = await users.findOne({type:"partner",userID:PartID})

    //const partner = await users.findOne({'userID':PartID,'tasks.taskID':Task_id })

    if(partner === null )
    res.json("either the partner or the task id is not correct")

    else {
      const task = partner.tasks
      const t = task.find(task => task.taskID === Task_id)
      const applicants = t.applicants
      const acc = applicants.find(applicants=> applicants.accepted === true)

      const ID = acc.applicantID

   
      users.update({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set: {'tasks.$.assigneeID':ID}}, function(err, model){});
   
      users.update({ 'userID':PartID,'tasks.taskID':Task_id, 'applicants.applicantID':ID}, 
      {$set:{"applicants.$.assigned":true}},
      function(err, model){});
      
      users.update({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set: {'tasks.$.lifeCycle.1':true}}, function(err, model){});
       
      const partners = await users.find({'userID':PartID,'tasks.taskID':Task_id})
      res.json(partners)

    }
   

 

 }); 
//------------------------------------------------------admin assigning the chosen consultancy agency by partner-------------------- 



router.put('/AssignConsultancyAgency/:idP/:idT', async(req,res)=>{
    
    const PartID = parseInt(req.params.idP)
    const Task_id = parseInt(req.params.idT)
    const partner = await users.findOne({type:"partner",userID:PartID})

    //const partner = await users.findOne({'userID':PartID,'tasks.taskID':Task_id })

    if(partner === null )
    res.json("either the partner or the task id is not correct")

    else {
      const task = partner.tasks
      const t = task.find(task => task.taskID === Task_id)
      const consultancies = t.consultancies
      const acc = consultancies.find(consultancies=> consultancies.accepted === true)

      const ID = acc.consultancyID

   
      users.update({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set: {'tasks.$.consultancyAssignedID':ID}}, function(err, model){});
   
      users.update({ 'userID':PartID,'tasks.taskID':Task_id, 'consultancies.consultancyID':ID}, 
      {$set: {'consultancies.$.assigned':true}}, function(err, model){});
      

      const partners = await users.find({'userID':PartID,'tasks.taskID':Task_id})
      res.json(partners)

    }
   

 }); 




      


//------------------------------------------------------nourhan-----------------------------------------

// router.get('/', function(req, res){
//     res.sendFile(path.resolve('./index.html'));
//   });



//   router.get('/sent',(req, res)=>{
//     res.sendFile(path.resolve('./index2.html'));
//   })

//   router.get('/messages', (req, res) => {

//     Message.find({},(err, messages)=> {
  
//       res.send(messages);
  
//     })
  
//   })
  


//   router.post('/messages', async (req, res) => {
  
//     try{
  
//       var message = new Message(req.body);
  
  
  
//       var savedMessage = await message.save()
  
//         console.log('saved');
  
  
  
//       var censored = await Message.findOne({message:'badword'});
  
//         if(censored)
  
//           await Message.remove({_id: censored.id})
  
//         else
  
//           io.emit('message', req.body);
  
//         res.sendStatus(200);
  
//     }
  
//     catch (error){
  
//       res.sendStatus(500);
  
//       return console.log('error',error);
  
//     }
  
//     finally{
  
//       console.log('Message Posted')
  
//     }
  
  
  
//   })
  

  
  
  
//   io.on('connection', () =>{
  
//     console.log('a user is connected')
  
//   })

  router.get('/viewmessages', async (req, res) => {
    const updt=await message.find()
    res.json({ data: updt })
})

//------------------------------------------------------------------------------------------------------

router.get('/', async(req, res) =>{ 
     const admins = await users.find({type:"admin"})
     res.json(admins)
 });

module.exports = router
