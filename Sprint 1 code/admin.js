const express = require('express')
const users = require('../../models/UserProfile')
const router = express.Router()
const Joi = require('joi');
//----------------------------- admin update a task's life cycle ---------------------------------------------//


//-------------------------------admin assigning the chosen member by partner--------------------------------// testing done


router.put('/AssignMember/:idP/:idT', async(req,res)=>{
    var flag=false;
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
      const acceptedApplicant = applicants.find(applicants=> applicants.accepted === true)

      const applicantID = acceptedApplicant.applicantID
       for(var i=0;i<t.applicants.length;i++){
           if(t.applicants[i].accepted===true)
           flag=true
       }
      if(flag===true){
      const a = applicants.filter(applicant => applicant.applicantID !== applicantID)
       
      const accepted = true
      const assigned = true

      newApplicant= {
          applicantID,
          accepted,
          assigned
         }
         const newApplicantsArray=[
             newApplicant
         ]

         if (typeof a === 'undefined') {
         }

      else {
         while (a.length !== 0){
          newApplicantsArray.push(a.pop())
         }
      }
      console.log(newApplicantsArray)
 
      users.updateOne({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set: {'tasks.$.assigneeID':applicantID}}, function(err, model){});

      users.updateOne({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set:{"tasks.$.applicants":newApplicantsArray}}, function(err, model){});

      users.update({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set: {'tasks.$.lifeCycle.1':true}}, function(err, model){});
       
      //const partners = await users.find({'userID':PartID,'tasks.taskID':Task_id})
      res.json(newApplicant)
    }
    else{
        res.json("no accepted applicants")
    }

    }
   

 

 }); 


 
//-----------------------------------admin assigning the chosen consultancy agency by partner--------------------// testing done



router.put('/AssignConsultancyAgency/:idP/:idT', async(req,res)=>{
    var flag=false;
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
      const acceptedConsultancy = consultancies.find(consultancies=> consultancies.accepted === true)
      
      for(var i=0;i<t.consultancies.length;i++){
        if(t.consultancies[i].accepted===true)
        flag=true
    }
    if(flag===true){
      const consultancyID = acceptedConsultancy.consultancyID
      const c = consultancies.filter(consultancy => consultancy.consultancyID !== consultancyID)

      const accepted = true
      const assigned = true
      newConsultancy = {
          consultancyID,
          accepted,
          assigned
         }
         const newConsultancyArray=[
             newConsultancy
         ]

         if (typeof c === 'undefined') {
         }
         else {

          while (c.length !== 0){
              newConsultancyArray.push(c.pop())
             }
         
        }
      console.log(newConsultancyArray)
 
 
      users.update({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set: {'tasks.$.consultancyAssignedID':consultancyID}}, function(err, model){});
   
      users.updateOne({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set:{"tasks.$.consultancies":newConsultancyArray}}, function(err, model){});
 
      //const partners = await users.find({'userID':PartID,'tasks.taskID':Task_id})
      res.json(newConsultancy)
    }
    else{
        res.json("no accepted consultancies for the task")
    }
    }
   

 }); 

 //--------------------------- admin check task description ---------------------------------------------

router.get('/CheckTaskDescriptions/:PID/:TID', async(req, res)=> {

    const PartID = parseInt(req.params.PID)
    const partner = await users.findOne({type:"partner",userID:PartID})
    const Task_id = parseInt(req.params.TID)

    if(partner===null) {
        res.json("the database has no partner with the given ID")
   } 
   else {
      const task = partner.tasks
      const task_to_check = task.find(task => task.taskID === Task_id)
      res.json(task_to_check);
   }
     
});

//----------------------------------------------------------------------------------------------------------


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
     
     const partners = await users.findOne({type:"partner",userID:PartID})
     const x = partners.tasks
     const task_to_post2 = x.find(task => task.taskID === Task_id)

     res.json(task_to_post2)

      }
      else
        { res.json( `${Task_id} not approved`) }
  
    
   }
  
   }


   
});
      
//----------------------------- admin activate Member's account---------------------------------------------


router.put('/ActivateAccounts/:MID', async (req, res)=> {
    const MemID = parseInt(req.params.MID)
    const activate = req.body.activate

    users.updateOne({'userID':MemID}, 
    {$set: {'activation':activate}}, function(err, model){}); 

    const members = await users.findOne({type:"member",userID:MemID})
    res.json(members)
});






 module.exports = router
