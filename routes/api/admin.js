//--------------------express--------------------
const express = require('express');
const router = express.Router();
var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId
const Joi = require('joi')
const notifier = require('node-notifier')
const cron = require('cron')
const nodemailer = require('nodemailer');


//--------------------models--------------------
const users = require('../../models/UserProfile');
const message = require('../../models/messages');


//============================== recieve notifications=================================//



// const job = cron.job('*/10 * * * * *', () => 
//     // console.log('helloo'),
//   //   getUsers(),
//      sendNotification('5c9114781c9d440000a926ce')

// );
// //job.start()

// async function sendNotification(Id){
//   const ID= ObjectId(Id)
//   const user = await users.findOne(ID)
//   const notif= user.notifications
//   console.log(notif)
//   notif.forEach(element => {

//     notifier.notify({
//       title: 'New Notification' ,
//       message: element.notificationContent,
//       //icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
//       sound: true, // Only Notification Center or Windows Toasters
//       wait: true // Wait with callback, until user action is taken against notification
//     }, function (err, response) {});
  
//     console.log(element.notifID)
//     notifier.on('click', function(notifierObj, options) {
//        users.updateOne({'_id':ID, }, 
//                        {$set: {'notifications.$[i].read': true, 'notifications.$[i].unread': false}},
//                        { arrayFilters: [{ "i.notifID": element.notifID }]},
//                        function(err, model){}); 

//       // element.read= true,
//       // element.unread= false
//       // // Triggers if `wait: true` and user clicks notification
//     //  console.log('The user clicked on the Notification!');
//     });
//   });
     
 
 
// }



//==================================================================================================================

//-------------------pathToSendFile----------------------------
var path = require('path');
const passport = require('passport')

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
  });

//--------------------see all updates--------------------
router.get('/viewUpdates', async (req, res) => {
    const updt= await users.find({},{'updates':1,'_id':1});
    for(var i=0;i<updt.length;i++){
        if(!updt[i] || !updt[i].updates || updt[i].updates.length===0) {
            updt.splice(i,1)
            i-=1                                          //since array is shifted when we splice
        }
    }
    if(!updt || updt.length===0) return res.status(404).send({error: 'No updates found'})
    res.json(updt);
})
//--------------------approve updates--------------------
router.put('/approveUpdates/:id/:uid',async (req,res)=>{
     try {
         const userid=req.params.id

         const updtid=parseInt(req.params.uid)

         const user= await users.findById(userid)
         if(!user || user.length===0)return res.status(404).send({error: 'User does not exist'})

        const update=await users.find({'_id':userid,'updates._id':updtid},{'updates':1})
        if(!update || update.length===0 || !update[0] || !update[0].updates[0])
        return res.status(404).send({error: 'Update does not exist'})


        //user may want to deactivate or activate account, therefore, activation can be changed  
        const newusers={'type':(update[0].updates[0].type===undefined?user.type:update[0].updates[0].type),
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
//--------------------------------------NotifyUsersToSignContract-------------------------------------------
router.put('/NotifyUsersToSignContract/:PID', async(req, res)=> {

  const PartID = req.params.PID
  const partner = await users.findOne({'_id':PartID})
  const email = partner.email
  const name = partner.name
  console.log(email)

  const {appointment, day, location} = req.body

  const schema = {
    appointment: Joi.string().required(),
    day: Joi.string().required(),
    location: Joi.string().required()
 };

const result = Joi.validate(req.body, schema);

if(result.error){
    return  res.send(result.error.details[0].message)
   }

else {
  const message =  `Hi ${name}! 
                    Thanks for signing up with LirtenHub.
                    To verify your account please meet with one of our team on ${day} at ${appointment} in ${location}.
                    If the appointment doesn't suite you, please contact us through our email.`

 // const subject =  "Urgent! LirtenHub Contract & Agreement"                
  sendMailToUsers(email,"Urgent! LirtenHub Contract & Agreement" , message , function(err, data){
      if (err){
          res.json(err);
      }
      res.json("email sent successfully")

  });

}
});

//--------------------disapprove updates--------------------
router.delete('/disapproveUpdates/:id/:uid',async(req,res)=>{
     try {
            const userid=req.params.id

            const updtid=parseInt(req.params.uid)

            const user= await users.findById(userid)
            if(!user || user.length===0)return res.status(404).send({error: 'User does not exist'})

            const update=await users.find({'updates._id':updtid},{'updates':1})
            if(!update || update.length===0)return res.status(404).send({error: 'Update does not exist'})

            const del=await users.update( { '_id':userid,'updates._id':updtid}, {$pull: {updates:{_id:updtid}} } );
    
            res.json({msg: 'Sorry your update request was disapproved by an admin'})
       
           }catch(error) {
               console.log(error);
           }  
});


//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//--------------------------------------notification with Mail-------------------------------------------
const nodemailer = require('nodemailer');

function sendMailToUsers(recieverEmail, subjectff, textxxx){

  const subjectttt = subjectff
  const textggg = textxxx  

  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "breakitdown.se@gmail.com",
      pass:  "break_1234"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let mailOptions = {
      from:'breakitdown.se@gmail.com',
      to: recieverEmail,
      subject: subjectttt,
      text: textggg
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //  html: "<b>Hello world?</b>" // html body
  };
  
    transporter.sendMail( mailOptions, function (error,info){
      if(error){
          console.log("something went wrong please try again later ");
      }
      else{
          console.log('email sent successfully');
      }
  });
}


//--------------------------------------notify users with expiry of their contract-------------------------------------------

  async function deactivateAccount(id){

    const activate = false
    users.updateOne({'_id':id}, 
    {$set: {'activation':activate} }, 
    function(err, model){}); 

    // const user = await users.findOne({'_id':MemID})
    // res.json(user)


  }

  function Noofmonths(date1, date2) {
    var Nomonths;
    //console.log(date1)
    Nomonths= (date2.getFullYear() - date1.getFullYear()) * 12;
    Nomonths-= date1.getMonth() + 1;
    Nomonths+= date2.getMonth() +1; // we should add + 1 to get correct month number
    return Nomonths <= 0 ? 0 : Nomonths;
  }

  async function checkExpiryDatePartner(currentDate){
      const userIds= await users.find({type:"partner"})
      userIds.forEach(element => {

      const activatedOn = element.membershipExpiryDate
      const difference = Noofmonths( new Date(activatedOn),new Date(currentDate))
      console.log(difference, element.name)

      if(difference === 11 ){
        // console.log('11 months passed')
        // return('11 months passed')

        const message =  `Hi ${element.name}! 
                          Your contract with LirtenHub is almost Expired.
                          Please contact one of our team, If you are willing to renew your contract with LirtenHub.
                          Otherwise, your account unfortunately will be deactivated.
                          `

        const email = element.email       
        sendMailToUsers(email,"Urgent! LirtenHub Account & Contract Expiration" , message , function(err, data){
        if (err){
            res.json(err);
          }
          res.json("email sent successfully")
          });
        }
      else if(difference >11){
        // console.log('not yet')
        // return('not yet')
        deactivateAccount(element._id)
        console.log("----------------")
        console.log(element.name)
      }

    });
  }

  async function checkExpiryDateMember(currentDate){
    const userIds= await users.find({type:"member"})
    userIds.forEach(element => {

    const activatedOn = element.membershipExpiryDate
    const difference = Noofmonths( new Date(activatedOn),new Date(currentDate))
    console.log(difference, element.name)

    if(difference === 11 ){
      // console.log('11 months passed')
      // return('11 months passed')

      const message =  `Hi ${element.name}! 
                        Your contract with LirtenHub is almost Expired.
                        Please contact one of our team, If you are willing to renew your contract with LirtenHub.
                        Otherwise, your account unfortunately will be deactivated.
                        `

      const email = element.email       
      sendMailToUsers(email,"Urgent! LirtenHub Account & Contract Expiration" , message , function(err, data){
      if (err){
          res.json(err);
        }
        res.json("email sent successfully")
        });
      }
    else if(difference >11){
      // console.log('not yet')
      // return('not yet')
      deactivateAccount(element._id)
      console.log("----------------")
      console.log(element.name)
    }

  });
  }

  async function checkExpiryDateCS(currentDate){
    const userIds= await users.find({type:"coworkingSpace"})
    userIds.forEach(element => {

    const activatedOn = element.membershipExpiryDate
    const difference = Noofmonths( new Date(activatedOn),new Date(currentDate))
    console.log(difference, element.name)

    if(difference === 11 ){
      // console.log('11 months passed')
      // return('11 months passed')

      const message =  `Hi ${element.name}! 
                        Your contract with LirtenHub is almost Expired.
                        Please contact one of our team, If you are willing to renew your contract with LirtenHub.
                        Otherwise, your account unfortunately will be deactivated.
                        `

      const email = element.email       
      sendMailToUsers(email,"Urgent! LirtenHub Account & Contract Expiration" , message , function(err, data){
      if (err){
          res.json(err);
        }
        res.json("email sent successfully")
        });
      }
    else if(difference >11){
      // console.log('not yet')
      // return('not yet')
      deactivateAccount(element._id)
      console.log("----------------")
      console.log(element.name)
    }

  });
  }

  async function checkExpiryDateCA(currentDate){
    const userIds= await users.find({type:"consultancyAgency"})
    userIds.forEach(element => {

    const activatedOn = element.membershipExpiryDate
    const difference = Noofmonths( new Date(activatedOn),new Date(currentDate))
    console.log(difference, element.name)

    if(difference === 11 ){
      // console.log('11 months passed')
      // return('11 months passed')

      const message =  `Hi ${element.name}! 
                        Your contract with LirtenHub is almost Expired.
                        Please contact one of our team, If you are willing to renew your contract with LirtenHub.
                        Otherwise, your account unfortunately will be deactivated.
                        `

      const email = element.email       
      sendMailToUsers(email,"Urgent! LirtenHub Account & Contract Expiration" , message , function(err, data){
      if (err){
          res.json(err);
        }
        res.json("email sent successfully")
        });
      }
    else if(difference >11){
      // console.log('not yet')
      // return('not yet')
      deactivateAccount(element._id)
      console.log("----------------")
      console.log(element.name)
    }

  });
  }




  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //checkExpiryDate(today)

  console.log("--------Partner--------")
  console.log(checkExpiryDatePartner(today))
  // console.log("--------Member--------")
  // console.log(checkExpiryDateMember(today))
  // console.log("----------CS----------")
  // console.log(checkExpiryDateCS(today))
  // console.log("----------CA----------")
  // console.log(checkExpiryDateCA(today))

  // const job = cron.job('* * * * * *', () => 
  //    console.log(checkExpiryDate(today))
  // );
  // job.start()







//----------------------------- admin update a task's life cycle ---------------------------------------------//
//---------------------------------admin assigning the chosen member by partner-------------------- 
router.put('/AssignMember/:idP/:idT', async(req,res)=>{ //tested all admin methods
    
    var flag=true;
    const PartID = req.params.idP
    const Task_id = parseInt(req.params.idT)
    const partner = await users.findOne({'_id':PartID} )

    if(partner === null )
    res.json("either the partner or the task id is not correct")

    else {
      
      const task = partner.tasks
      const t = task.find(task => task.taskID === Task_id)
     
      if (t.wantsConsultant === false){
      const applicants = t.applicants
      const acceptedApplicant = applicants.find(applicant=> applicant.accepted === true)
      const applicantID = acceptedApplicant.applicantID
      
      for(var i=0;i<t.applicants.length;i++){
           if(t.applicants[i].assigned===true)
          flag=false
       }

     if(flag===true){
    
      const f = await users.findOneAndUpdate(
        {"_id":PartID},
        { $set: { "tasks.$[i].applicants.$[j].assigned":true,
                  "tasks.$[i].lifeCycle.1":true,
                  "tasks.$[i].assigneeID":applicantID     
        }},
        { arrayFilters: [
            { "i.taskID": Task_id },
            { "j.applicantID": applicantID  }
        ]});


        const f2 = await users.findOneAndUpdate(
            {"_id": applicantID},
            { $set: { "memberTasks.$[i].accepted":true,
    
            }},
            { arrayFilters: [
                { "i.taskID": Task_id }
             ]});


      res.json ("assigning done successfully")
       }
   
       else{ res.json("an applicant was already assigned to this task")  } 
   }
  
   else{ res.json("partner requested a consultancy agency to help with the task including assigning applicants to the task")}
}}); 

// //-----------------------------------admin assigning the chosen consultancy agency by partner--------------------// 
router.put('/AssignConsultancyAgency/:idP/:idT', async(req,res)=>{
    var flag=true;
    const PartID = req.params.idP
    const Task_id = parseInt(req.params.idT)
    const partner = await users.findOne({'_id':PartID} )

    if(partner === null )
    res.json("either the partner or the task id is not correct")

    else {
      
      const task = partner.tasks
      const t = task.find(task => task.taskID === Task_id)
      const consultancies = t.consultancies
      const acceptedConsultancy = consultancies.find(consultancies=> consultancies.accepted === true)
      const consultancyID = acceptedConsultancy.consultancyID
      

      for(var i=0;i<t.consultancies.length;i++){
        if(t.consultancies[i].assigned===true)
        flag=false
    }

    if(flag===true){
    
        const f = await users.findOneAndUpdate(
          {"_id":PartID,},
          { $set: { "tasks.$[i].consultancies.$[j].assigned":true,
                    "tasks.$[i].consultancyAssignedID":consultancyID     
          }},
          { arrayFilters: [
              { "i.taskID": Task_id },
              { "j.consultancyID": consultancyID  }
          ]});

        res.json ("assigning done successfully")
         }
    else{ res.json("a consultancy was already assigned to this task") }
   }
}); 

 //--------------------------- admin check task description ---------------------------------------------
router.get('/CheckTaskDescriptions/:PID/:TID', async(req, res)=> {
    const id =  req.params.PID
    const PartID =ObjectId(id)
    const partner = await users.findOne(PartID)
    const Task_id = parseInt(req.params.TID)

    if(partner===null) {
        res.json("the database has no partner with the given ID")
   } 
   else {
    const partner2 = await users.findOne(PartID)

      const task = partner2.tasks
      const task_to_check = task.find(task => task.taskID === Task_id)
      res.json(task_to_check);
   }
     
});

//
//-------------------------- admin post task on main ----------------------------------------------------------
// partner id and task id are passed to the method to be able to access the required task to be checked  whether its approved or not 

router.put('/ApproveTasks/:PID/:TID', async(req, res)=> {

  const id =  req.params.PID
  const PartID =ObjectId(id)
  const partner = await users.findOne(PartID)
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

    const f = await users.findOneAndUpdate(
      {"_id":PartID,},
      {
        $set: {
          "tasks.$[i].approved":true,
          "tasks.$[i].lirtenHubVerified":true,
          "tasks.$[i].lifeCycle.0":true

        }
      },

      {
        arrayFilters: [
          { "i.taskID": Task_id }
        ]
        
      }
    );

   
   const partners = await users.findOne(PartID)
   const x = partners.tasks
   const task_to_post2 = x.find(task => task.taskID === Task_id)
   res.json(task_to_post2)
 }
 }
 
});
   
router.put('/DisapproveTasks/:PID/:TID', async(req, res)=> {

  const PartID = ObjectId(req.params.PID)
  const partner = await users.findOne(PartID)
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
      const f = await users.findOneAndUpdate(
        {"_id":PartID,},
        {
          $set: {
            "tasks.$[i].approved":false,
            "tasks.$[i].lirtenHubVerified":false,
            "tasks.$[i].lifeCycle.0":false
  
          }
        },
  
        {
          arrayFilters: [
            { "i.taskID": Task_id }
          ]
          
        }
      );
   
   const partners = await users.findOne(PartID)
   const x = partners.tasks
   const task_to_post2 = x.find(task => task.taskID === Task_id)
   res.json(task_to_post2)
 }
 }   
});
   

//----------------------------- admin activate user's account---------------------------------------------
router.put('/ActivateAccounts/:MID', async (req, res)=> {
    const MemID = req.params.MID
    const activate = true

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime)

    users.updateOne({'_id':MemID}, 
    {$set: {'activation':activate,
            'membershipExpiryDate': dateTime}
          }, function(err, model){}); 

    const user = await users.findOne({'_id':MemID})
    res.json(user)
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

 //---------------------------------get all users--------------------------------------

 router.get('/viewUser/:id', async(req, res) =>{ 
    const userId=req.params.id
    const user = await users.find({_id:userId},{updates:0})
    res.json(user[0])
});


module.exports = router
