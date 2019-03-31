//--------------------express--------------------
const express = require('express');
const router = express.Router();

//--------------------models--------------------
const users = require('../../models/UserProfile');
const message = require('../../models/messages');


//-------------------pathToSendFile----------------------------
var path = require('path');

//--------------------get contact info of partner--------------------
router.get('/contact/:pid',async (req, res)=>{

    var partner = parseInt(req.params.pid);
  
    await users.find({userID : partner},{email : 1,phoneNumber:1, _id :0},(err, r)=>{

        res.send(r);
    });
});
  


//-----------------------chat-----------------------------

router.get('/chat',function(req,res){
    res.sendFile(path.resolve('./indexx.html'));
   // console.log("fuck")
   // fuck();
  });

//--------------------see all updates--------------------
router.get('/viewUpdates', async (req, res) => {
    const updt=await users.find();
    res.json({ data: updt });
})
//--------------------approve updates--------------------
router.put('/approveUpdates/:id/:uid',async (req,res)=>{
     try {
         const userid=parseInt(req.params.id)

         const updtid=parseInt(req.params.uid)

         const user= await users.findById(userid)
         if(!user)return res.status(404).send({error: 'User does not exist'})

        const update=await users.find({'_id':userid,'updates._id':updtid},{'updates':1})
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
        
        const updatedUser=await users.update({'_id':userid},{$set:{type:newusers.type,name:newusers.name,password:newusers.password,
        email:newusers.email,phoneNumber:newusers.phoneNumber,field:newusers.field,memberTasks:newusers.memberTasks,
        activation:newusers.activation,address:newusers.address,birthday:newusers.birthday,skills:newusers.skills,
        interests:newusers.interests,accomplishments:newusers.accomplishments,trainers:newusers.trainers,
        trainingPrograms:newusers.trainingPrograms,partners:newusers.partners,boardMembers:newusers.boardMembers,events:newusers.events,
        reports:newusers.reports,tasks:newusers.tasks,certificates:newusers.certificates,website:newusers.website,
        description:newusers.description,facilities:newusers.facilities,rooms:newusers.rooms}})

        const approve=await users.update( { '_id':userid,'updates._id':updtid}, {$pull: {updates:{_id:updtid}}});
    
         res.json({msg: 'User updated successfully'})
        }
        catch(error) {
            console.log(error) ; 
        }  
});

//--------------------disapprove updates--------------------
router.delete('/disapproveUpdates/:id/:uid',async(req,res)=>{
     try {
            const userid=parseInt(req.params.id)

            const updtid=parseInt(req.params.uid)

            const user= await users.findById(userid)
            if(!user)return res.status(404).send({error: 'User does not exist'})

            const update=await users.find({'updates._id':updtid},{'updates':1})
            if(!update)return res.status(404).send({error: 'Update does not exist'})

            const del=await users.update( { '_id':userid,'updates._id':updtid}, {$pull: {updates:{_id:updtid}} } );
    
            res.json({msg: 'Sorry your update request was disapproved by an admin'})
       
           }catch(error) {
               console.log(error);
           }  
});

//--------------------------- admin check task description ---------------------------------------------

router.get('/CheckTaskDescriptions/:PID/:TID', async(req, res)=> {

    const PartID = parseInt(req.params.PID);
    const partner = await users.findOne({type:"partner",userID:PartID})
    const Task_id = parseInt(req.params.TID);

    if(partner===null) {
        res.send("the database has no partner with the given ID" )
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
});

//----------------------------admin assigning the chosen member by partner-------------------- 
router.put('/AssignMember/:idP/:idT', async(req,res)=>{

    const PartID = parseInt(req.params.idP)
    const Task_id = parseInt(req.params.idT)
    const partner = await users.findOne({type:"partner",userID:PartID})

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

 //---------------------------------------admin assigning the chosen consultancy agency by partner-------------------- 
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

 //----------------------------------view messages---------------------------------- 
  router.get('/viewmessages', async (req, res) => {
    const updt=await message.find()
    res.json({ data: updt })
})

//---------------------------------get all admins--------------------------------------

router.get('/', async(req, res) =>{ 
     const admins = await users.find({type:"admin"})
     res.json(admins)
 });


module.exports = router
