const express= require('express');
const router= express.Router();
const Joi = require('joi');

const partner = require('../../models/Partner');
const users=require('../../models/UserProfile');
var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId


//nourhan -------------------------------------------------------------------------------------------------------------------
const message = require('../../models/messages');


//-------------------pathToSendFile----------------------------
var path = require('path');

var objectid = require('mongodb').ObjectID

//-----------------------chat-----------------------------

router.get('/chat',function(req,res){
    res.sendFile(path.resolve('./indexx.html'));
  });

   //----------------------------------view messages---------------------------------- 
   router.get('/viewmessages', async (req, res) => {
    const updt=await message.find()
    res.json({ data: updt })
});
//-----------------------------------partner submit task description-------------------------------------------//  done with id, done react

router.post("/createTask/:PID", async (req, res) => {
  const name = req.body.name;
  const ownerID = ObjectId(req.params.PID);
  //const pid = ObjectId(req.params.PID);
  const description = req.body.description;
  const wantsConsultant = req.body.wantsConsultant;
  const field=req.body.field;
  //const skills=req.body.skills;
  const applicants = [];
  const approved = false;
  const lifeCycle=[false,false,false,false]
  const partner= await users.findOne(ownerID)
  if(partner === null )
  {res.json("the partner id is not correct")}
else{
  const taskID=(partner.tasks.length)
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    wantsConsultant: Joi.boolean().required(),
    field: Joi.string().required(),
    //skills: Joi.array().required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return res.send(error.message);
  }
  

  const newtask = {
    taskID,
    name,
    description,
    wantsConsultant,
    lifeCycle,
    field,
    //pid ,  //for malak and abdelrahman
   // skills,
    approved,
    applicants
  };

  const t = await users.findOne(ownerID);
  t.tasks.push(newtask);
  
  users.updateOne(
    { '_id': ownerID},
    { $set: { tasks: t.tasks } },
    function(err, model) {}
  );
  return res.json(newtask);
}
 
  
});

//--------------------------Partner view task's applicants -----------------------------------//  done with id ,done react
router.get("/view/:PID/:TID", async (req, res) => {
  const partnerID = ObjectId(req.params.PID);
  const taskIDb = parseInt(req.params.TID);
  const partner = await users.findOne(partnerID);
  var task2 = {};
  if(partner === null )
  {
    res.json("the partner id is not correct")
  }
  else{
    var task = partner.tasks
    var t = task.find(task => task.taskID === taskIDb)
      
      if(t === null)
       {
         res.json("the task Id is not correct")
        }
   else{
       res.send(t.applicants);
   }   
  }
 
});
//-------------------------choose and send the applicant to the admin to assign-------------------------//  done with id

router.put('/AcceptApplicant/:idP/:idT',async(req,res)=>{
  var flag=false;
  const PartID = (req.params.idP)
  const Task_id = parseInt(req.params.idT)

  const partner = await users.findOne({"_id":PartID})
  if(partner === null )
  {res.json("the partner id is not correct")}
  else{
    const task = partner.tasks
      
      const t = task.find(task => task.taskID === Task_id)

      if(t === null) {
        res.json("the task Id is not correct")
      }
      else{
        const applicantID = req.body.applicantID
        const schema = {
          applicantID:Joi.string().required()                    //the member needs to pass his object id in the applicantID and not his user id
          //applicantID:Joi.number().required()
       }

    const result=Joi.validate(req.body,schema)

    if(result.error)
    return res.status(400).send(error.message);
    else{
      for(var i=0;i<t.applicants.length;i++){
        if(t.applicants[i].accepted===true)
        flag=true;
       }
       if(flag===false){
        const f = await users.findOneAndUpdate(
          {"_id":PartID,},
          {
            $set: {
              "tasks.$[i].applicants.$[j].accepted":true
   
            }
          },
    
          {
            arrayFilters: [
              { "i.taskID": Task_id },
              { "j.applicantID": ObjectID(applicantID)  }
            ]
            
          }
        );
  
      res.json("done")
      

       }
       else{
        res.json("there exists an accepted applicant for the task")
    }
    }
    }
    }
 
  

  
});



//-------------------------------partner review tasks and rate member assigned -----------------------------------// done with id,done with react,handle applicant object id


router.put('/ReviewandRate/:PID/:TID',async(req,res)=>{

  const partnerID = ObjectId(req.params.PID)
  const partner = await users.findOne(partnerID)

  const taskID = parseInt(req.params.TID)

  if(partner === null )
  {res.json("the partner id is not correct")}
  else{
    var task = partner.tasks
      
      const t = task.find(task => task.taskID === taskID)

      if(t === null) {
        res.json("the task Id is not correct")
       }
       else{
        for(var i =0;i<partner.tasks.length;i++){
          if(partner.tasks[i].taskID===taskID)
              task=partner.tasks[i]
      }
      
     // console.log(task.lifeCycle[3])
      const rate = req.body.rating
      const review = req.body.review 
     
      const schema = {
          rating: Joi.number().min(0).max(5).required(),
          review: Joi.string().required()
       };
    
      const result = Joi.validate(req.body, schema);
    
      if(result.error){
          return  res.send(result.error.details[0].message)
         }
    
      else {
      const taskDone = task.lifeCycle[3]
    
      if(taskDone === true){
          task.rate = rate
          task.review = review
    
         const assigneeID = task.assigneeID
    
         const f = await users.findOneAndUpdate(
          {"_id":partnerID},
          {
            $set: {
              "tasks.$[i].review":review,
              "tasks.$[i].rate":parseInt(rate),
    
            }
          },
    
          {
            arrayFilters: [
              { "i.taskID": taskID  }
            ]
            
          }
        );
        const x = await users.findOneAndUpdate(
          {"userID":assigneeID},
          {
            $set: {
              "allRatings":rate
    
            }
          }
        );
    
          res.json("you're review and rate has been successfully added")
      }
       else {
          return res.send({error: 'task is not done yet'})
       }
    
      }
    
         
      } 
    }
  
});


//-------------------------------------partner view task's consultancies------------------------------------------// done with id, done with react
router.get("/viewConsultancy/:PID/:TID", async (req, res) => {
  const partnerID = ObjectId(req.params.PID);
  const taskIDb = parseInt(req.params.TID);
  const partner = await users.findOne(partnerID);
  var task2 = {};
  if(partner === null )
  {
    res.json("the partner id is not correct")
  }
  else{
    var task = partner.tasks
    var t = task.find(task => task.taskID === taskIDb)
      
      if(t === null)
       {
         res.json("the task Id is not correct")
        }
   else{
       res.send(t.consultancies);
   }   
  }
 
});






module.exports = router
