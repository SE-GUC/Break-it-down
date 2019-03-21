const express = require('express')

const router = express.Router()

const validator = require('../../validations/updateValidations')

// We will be connecting using database 

const Admin = require('../../models/Admin')

const User = require('../../models/User')

const Partners = require('../../models/Partner');

const Members = require('../../models/Member')

const Joi = require('joi');

//------------------------------nourhan--------------------------------------------
var bodyParser = require('body-parser')

var mongoose = require('mongoose');

const Message = require('../../models/Message')

var http = require('http').Server(router);

var io = require('socket.io')(http);

var path = require('path');



// temporary data created as if it was pulled out of the database ...

const admins = [

    new Admin(1,'Menna', 'Yasser'),

    new Admin(2,'Reem','Khaled')

];

const users=[
    {id:1,firstname:"Nadia",lastname:"Talaat",age:36},
    {id:2,firstname:"Khaled",lastname:"Tahawi",age:50},
    {id:3,firstname:"Somaya",lastname:"Afifi",age:60}
];

const updates=[
    {id:2,firstname:"Yara",status:"pending"},
    {id:1,lastname:"Khaled",status:"pending"},
    {id:3,lastname:"Khaled",status:"approved"}

];

//router.get('/', (req, res) => res.json({ data: admins }));

router.get('/viewUpdates', (req, res) => {
    const updt=updates.filter(updt=>updt.status==="pending")
    res.json({ data: updt })
})

router.put('/approveUpdates/:id',(req,res)=>{
     try {
    
         const id = parseInt(req.params.id)
         const uid=parseInt(req.params.id)
    
         const user =  users.findIndex(user => user.id === id);
         const update=updates.findIndex(update => update.id === uid);
    
         if(user===-1 || update===-1) return res.status(404).send({error: 'User does not exist'})
         const isValidated = validator.updateValidation(req.body)
         if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    
         const userid =  req.body.id   
         const firstname= req.body.firstname
         const lastname= req.body.lastname
         const age= req.body.age 

         if(userid !== undefined )   users[user].id=userid
         if(firstname !== undefined )   users[user].firstname=firstname
         if(lastname !== undefined )   users[user].lastname=lastname
         if(age !== undefined )   users[user].age=age
         updates[update].status="approved"
    
         res.json({msg: 'User updated successfully'})
    
        }
    
        catch(error) {
    
            // We will be handling the error later
    
            console.log(error)  
    
        }  

});

router.delete('/disapproveUpdates/:id',(req,res)=>{
         const uid=req.params.id
    
         const update=updates.findIndex(update => update.id === uid);

         updates.splice(update,1)

         res.json({msg: 'Sorry your update request was disapproved by an admin'})


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

//------------------------------------------------------------------------------------------------------

//router.get('/', (req, res) => res.json("admin profile default route"));


module.exports = router
