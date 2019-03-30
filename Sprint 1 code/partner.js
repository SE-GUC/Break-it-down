const express = require("express");
const users = require("../../models/UserProfile");
const router = express.Router();
const Joi = require("joi");

//-----------------------------------partner submit task description-------------------------------------------//  testing done

router.post("/createTask/:id", async (req, res) => {
  const name = req.body.name;
  const ownerID = parseInt(req.params.id);
  const description = req.body.description;
  const wantsConsultant = req.body.wantsConsultant;
  const applicants = [];
  const approved = false;
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    wantsConsultant: Joi.boolean().required()
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) return res.status(400).send(error.details[0].message);

  const newtask = {
    name,
    description,
    wantsConsultant,
    approved,
    applicants
  };

  const t = await users.findOne({ type: "partner", userID: ownerID });
  t.tasks.push(newtask);

  //console.log(t.tasks)

  users.update(
    { userID: ownerID, type: "partner" },
    { $set: { tasks: t.tasks } },
    function(err, model) {}
  );
  return res.json(newtask);
});

//--------------------------Partner view task's applicants -----------------------------------//  testing done
router.get("/view/:idP/:idT", async (req, res) => {
  const partnerID = parseInt(req.params.idP);
  const taskIDb = parseInt(req.params.idT);
  const partner = await users.find({ type: "partner", userID: partnerID });
  let data = "";
  var task = {};
  for (var i = 0; i < partner.length; i++) {
    for (var j = 0; j < partner[i].tasks.length; j++) {
      if (partner[i].tasks[j].taskID === taskIDb)
        task = partner[i].tasks[j].applicants;
      data =
        "task id:" +
        partner[i].tasks[j].taskID +
        "  " +
        "task name:" +
        partner[i].tasks[j].name;
    }
  }
  //console.log(task)

  res.send({ data, task });
});
//-------------------------choose and send the applicant to the admin to assign-------------------------//  testing done


router.put('/AcceptApplicant/:idP/:idT',async(req,res)=>{
    var flag=false;
    const PartID = parseInt(req.params.idP)
    const Task_id = parseInt(req.params.idT)
    const partner = await users.findOne({type:"partner",userID:PartID})

    if(partner === null )
    res.json("the partner id is not correct")

    else {
      const task = partner.tasks
      const t = task.find(task => task.taskID === Task_id)

      if(t === null) res,json("the task Id is not correct")
      else{
          const applicantID = req.body.applicantID
          const schema = {
            applicantID:Joi.number().required()
         }

      const result=Joi.validate(req.body,schema)

      if(result.error)
      return res.status(400).send(error.message);


      else{

        const applicants=t.applicants
        const a = applicants.filter(applicant => applicant.applicantID !== applicantID)
 
      for(var i=0;i<t.applicants.length;i++){
          if(t.applicants[i].accepted===true)
          flag=true;
         }

        if(flag===false){
        const accepted = true
        const assigned = false
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
   //   console.log(newApplicantsArray)
       
    users.updateOne({ 'userID':PartID,'tasks.taskID':Task_id}, 
    {$set:{"tasks.$.assigneeID":applicantID}},
    function(err, model){});

    users.updateOne({ 'userID':PartID,'tasks.taskID':Task_id}, 
    {$set:{ "tasks.$.applicants":newApplicantsArray}},
    function(err, model){});


      //const partners = await users.find({'userID':PartID,'tasks.taskID':Task_id})
      res.json(newApplicant)
      }
      else{
        res.json("there exists an accepted applicant for the task")
    }
      }
 
    }
}

    
 }); 




//-------------------------------partner review tasks and rate member assigned -----------------------------------// testing done


router.put('/Review&Rate/:idP/:idT',async(req,res)=>{

    const partnerID = parseInt(req.params.idP)
    const partner = await users.findOne({type:"partner",userID:partnerID})

    const taskID = parseInt(req.params.idT)
    
    for(var i =0;i<partner.tasks.length;i++){
        if(partner.tasks[i].taskID===taskID)
           var task=partner.tasks[i]
    }
    
    console.log(task.lifeCycle[3])
    const rate = req.body.rating
    const review = req.body.review 
   
    const schema = {
        rating: Joi.number().min(0).max(5).required(),
        review: Joi.string().required()
     };
 
    const result = Joi.validate(req.body, schema);

    if(result.error){
        return  res.status(400).send(result.error.details[0].message)
       }

    else {
    const taskDone = task.lifeCycle[3]

    if(taskDone === true){
        task.rate = rate
        task.review = review

        const applicants = task.applicants
        for(var k=0;k<applicants.length;k++){
            if(applicants[k].assigned===true && applicants.accepted===true){
                memberAssigned=applicants[k]
                var app = memberAssigned.applicantID
            }
        }
        
        const mem = await users.findOne({type:"member",userID:app})
     
        mem.allRatings.push(rate)

 

        users.update({ 'userID':app,'type':'member'}, 
        {$set: {'allRatings':mem.allRatings}}, function(err, model){});

        users.update({ 'userID':partnerID,'type':'partner','tasks.taskID':taskID}, 
        {$set: {'tasks.$.review':review}}, function(err, model){});
        users.update({ 'userID':partnerID,'type':'partner','tasks.taskID':taskID}, 
        {$set: {'tasks.$.rate':rate}}, function(err, model){});

     }
     else {
         res.json('the task is not done yet')
     }

    }

 }); 

//-----------------------------------partner choose a consultancy agency -------------------------------------------// testing done

///////////////////  remeber that the the route had a spelling mistake in consultancy <<<< consultacy >>>>


router.put('/ChooseConsultancyAgency/:idP/:idT',async(req,res)=>{
    var flag=false;
    const PartID = parseInt(req.params.idP)
    const Task_id = parseInt(req.params.idT)
    const partner = await users.findOne({type:"partner",userID:PartID})

    if(partner === null )
    res.json("the partner id is not correct")

    else {
      const task = partner.tasks
      const t = task.find(task => task.taskID === Task_id)
      
      if(t === null) res,json("the task Id is not correct")
      else{
      const consultancyID = req.body.consultancyID
      for(var i=0;i<t.consultancies.length;i++){
          if(t.consultancies[i].accepted===true)
          flag=true
      } 

      if(flag===false){
      const schema = {
        consultancyID:Joi.number().required()
         }

      const result=Joi.validate(req.body,schema)

      if(result.error)
       return res.status(400).send(error.message);
      else{
      const consultancies=t.consultancies
      const c = consultancies.filter(consultancy => consultancy.consultancyID !== consultancyID)

 
    //  console.log(c)
      const accepted = true
      const assigned = false
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
        //console.log(newConsultancyArray)
         
      users.updateOne({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set:{"tasks.$.consultancyAssignedID":consultancyID}},
      function(err, model){});

      users.updateOne({ 'userID':PartID,'tasks.taskID':Task_id}, 
      {$set:{ "tasks.$.consultancies":newConsultancyArray}},
      function(err, model){});

      res.json(newConsultancy)
        }
      }
      if(flag===true){
          res.json("there exists an accepted applicant for the task")
      }
    }
  }

});

module.exports = router;
