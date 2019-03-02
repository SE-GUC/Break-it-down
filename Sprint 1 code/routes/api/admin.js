//const main = require('../../routes/api/main')
const express = require('express');
const router = express.Router();

//const Admins = require('../../models/Admin');
const Partners = require('../../models/Partner');

const Members = require('../../models/Member')


const Joi = require('joi');


//--------------------------- admin check task description --------------------------------------------- LINA

router.get('/:PID/:TID', (req, res)=> {


    const PartID = req.params.PID
    const Part = Partners.find(Partner => Partner.ID === parseInt(PartID))

    const Task_id = req.params.TID
    const Task_Array = Part.Tasks
    const task_to_check = Task_Array.find(Tasks => Tasks.taskID === parseInt(Task_id))


    res.send(task_to_check)
   
});
//----------------------------get all applicants of a task that belongs to partner----------------------------- Janna
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
    
    if(approval === true)
    {
       res.send(task_to_post)
    }
    else
    res.send('not approved') 

});
      
//----------------------------- admin activate Member's account--------------------------------------------- JANNA


router.put('/:MID', (req, res)=> {
    const MemID = req.params.MID
    const Mem = Members.find(Member => Member.ID === parseInt(MemID))

    const activation = req.body.activation;
    Mem.activated = activation;
    res.send(Mem)
});




//------------------------------------------------------------------------------------------------------
router.get('/', (req, res) => res.json("admin profile default route"));

module.exports = router