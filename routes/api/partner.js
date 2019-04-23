const express= require('express');
const router= express.Router();
const Joi = require('joi');

const partner = require('../../models/Partner');
const users=require('../../models/UserProfile');
var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId


const cron = require('cron')
const notifier = require('node-notifier')
const CronJob = require('cron').CronJob

const jwt = require("jsonwebtoken");

const tokenKey = require("../../config/keys").secretOrKey;

var store = require("store");

//------------------------------------notifications-----------------------------------

new CronJob('0,30  * * * *', function() {
  console.log("===================================================================")

  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
     // res.sendStatus(403);
    } else {
      const ID = ObjectId(authorizedData.id);
      sendNotification(ID)
    }
  })
}, null, true, 'America/Los_Angeles');



async function sendNotification(Id) {
  const ID = ObjectId(Id);
  const user = await users.findOne(ID);
  const notif = user.notifications;
  console.log(notif);
  notif.forEach(element => {
    notifier.notify(
      {
        title: "New Notification",
        message: element.notificationContent,
        //icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
        sound: true, // Only Notification Center or Windows Toasters
        wait: true // Wait with callback, until user action is taken against notification
      },
      function(err, response) {}
    );

    console.log(element.notifID);
    notifier.on("click", function(notifierObj, options) {
      users.updateOne(
        { _id: ID },
        {
          $set: {
            "notifications.$[i].read": true,
            "notifications.$[i].unread": false
          }
        },
        { arrayFilters: [{ "i.notifID": element.notifID }] },
        function(err, model) {}
      );

      // element.read= true,
      // element.unread= false
      // // Triggers if `wait: true` and user clicks notification
      //  console.log('The user clicked on the Notification!');
    });
  });
}

async function notify(senderIDs, Id, content) {

   //==== if notification sent from admin===//

  if(senderIDs === ""){
    const senderName = "LirtenHub"
    const ID = ObjectId(Id);
    const user = await users.findOne(ID);
    if (user === null) {
      res.json("the database has no partner with the given ID");
    } else {
      const notificationContent = content;
      const read = false;
  
      newNotification = {
        senderName,
        notificationContent,
        read
      };
        await users.updateOne(
        { _id: ID },
        { $push: { notifications: newNotification } },
        function(err, model) {}
      );
  
      const user2 = await users.findOne({ _id: ID });
      const not2 = user2.notifications;
      console.log(not2);
    }
  }
     //==== if notification sent to admin===//
  else{
    if(Id === ""){
        const senderID = ObjectId(senderIDs);
        const sender = await users.findOne(senderID);
        const senderName = sender.name
        const admins = await users.find({type:'admin'});

          const notificationContent = content;
          const read = false;

          newNotification = {
            senderName,
            notificationContent,
            read
          };

          admins.forEach(async(element) => {
            await users.updateOne(
              { _id: element._id },
              { $push: { notifications: newNotification } },
              function(err, model) {}
            );
          });  
      }

       //==== if notification does not include the admin===//
      else{

      const senderID = ObjectId(senderIDs);
      const sender = await users.findOne(senderID);
      const senderName = sender.name
      const ID = ObjectId(Id);
      const user = await users.findOne(ID);
      if (user === null) {
        res.json("the database has no partner with the given ID");
      } else {
        const notificationContent = content;
        const read = false;

        newNotification = {
          senderName,
          notificationContent,
          read
        };
        await users.updateOne(
          { _id: ID },
          { $push: { notifications: newNotification } },
          function(err, model) {}
        );

        const user2 = await users.findOne({ _id: ID });
        const not2 = user2.notifications;
        console.log(not2);
      }
    }
  }
}


//Get specific partner -Nourhan
router.get("/viewProfile/:pID", async (req, res) => {
  try {
    const partner = await users.findOne({
      type: "partner",
      _id: objectid(req.params.pID)
    });
    // console.log("length: "+partner);
    if (partner === undefined || partner.length == 0)
      return res.json("Partner does not exist");
    res.json(partner);
  } catch (error) {
    res.json(error.message);
  }
});

//---------------------------------get user notification------------------------------- 
router.get('/getNotifications', async (req, res)=>{
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } 
    
    else {
        const id = ObjectId(authorizedData.id) 
        const user = await users.findOne(id);
        const notif = user.notifications
        console.log(notif)
        res.json(notif)

    }
  });
})
//nourhan -------------------------------------------------------------------------------------------------------------------
const message = require('../../models/messages');
var objectid = require('mongodb').ObjectID


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

//----------------shaza-view all coworking spaces------------------------------//
router.get("/PartnerCoworkingspaces", async (req, res) => {
  const Users = await User.find({ type: "coworkingSpace" });
  res.json(Users);
});


//------------------------------------
//Get All partners
router.get("/viewAllProfile", async (req, res) => {
  const r = await users.find({ type: "partner" });
  res.json(r);
});


//-----------------------------------partner submit task description-------------------------------------------//  done all

router.post("/createTask", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const name = req.body.name;
      const ownerID = ObjectId(authorizedData.id) ;
      const pid = ownerID;
      const description = req.body.description;
      const wantsConsultant = req.body.wantsConsultant;
      const field=req.body.field;
      const skills=req.body.skills;
      const applicants = [];
      const approved = false;
      const lifeCycle=[false,false,false,false]
      const partner= await users.findOne(ownerID)
      if(partner === null )
      {res.json("the partner id is not correct")}
    else{
      var taskID=(partner.tasks.length)
      var task = partner.tasks
      var tt = task.find(task => task.taskID === taskID)
      if(tt !== null){
        for(var k=0;k<task.length;k++){
          if(task[k].taskID===taskID){
            console.log(taskID)
            taskID=taskID+1
          }
        }
      }
      const schema = {
        name: Joi.string().required(),
        description: Joi.string().required(),
        wantsConsultant: Joi.boolean().required(),
        field: Joi.string().required(),
        skills: Joi.array().required(),
      };
      const result = Joi.validate(req.body, schema);
      wantsConsultant=JSON.parse(wantsConsultant)
      // if (result.error) {
      //   return res.send(error);
      // }
      const newtask = {
        taskID,
        name,
        description,
        wantsConsultant,
        lifeCycle,
        field,
        pid ,  //for malak and abdelrahman
        skills,
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
          notify( pid, "", `${partner.name} created a new task`)

      return res.json({data:"you task was created successfully"});
    }
    }
  
 
}); 
});

//--------------------------Partner view task's applicants -----------------------------------//  done all
router.get("/view/:TID", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const partnerID = ObjectId(authorizedData.id);
      const taskIDb = parseInt(req.params.TID);
      const partner = await users.findOne(partnerID);
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
         if(t.wantsConsultant===true){
           res.json()
         }
         else{
           res.send(t.applicants);
         }
           
       }   
      }
     
    }
  });

});

//-------------------------choose and send the applicant to the admin to assign-------------------------//  done with id

router.put('/AcceptApplicant/:idT/:idA',async(req,res)=>{
    jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      var flag=false;
      const PartID = ObjectId(authorizedData.id)
      const Task_id = parseInt(req.params.idT)
     const applicantID =ObjectId(req.params.idA)
      const partner = await users.findOne(PartID)
      if(partner === null )
      {res.json("the partner id is not correct")}
      else{
        const task = partner.tasks
          
          const t = task.find(task => task.taskID === Task_id)
    
          if(t === null) {
            res.json("the task Id is not correct")
          }
          else{
            for(var i=0;i<t.applicants.length;i++){
            if(t.applicants[i].accepted===true)
            flag=true;
           }
           if(flag===false){

            const f = await users.findOneAndUpdate(
              {"_id":PartID},
              {
                $set: {
                  "tasks.$[i].applicants.$[j].accepted":true
       
                }
              },
        
              {
                arrayFilters: [
                  { "i.taskID": Task_id },
                  { "j.applicantID": applicantID  }
                ]
                
              }
            );
      
            notify( PartID, "", `${partner.name} accepted a member for task: ${t.name}`)

          res.json({data:"your applicant has been successfully choosen"})
          
    
           }
           else{
            res.json({data:"there exists an accepted applicant for the task...process failed"})
        }
        
        }
        }
    }
  });
  
 
  

  
});

//-------------------------------partner review tasks and rate member assigned -----------------------------------// done with id,done with react,handle applicant object id

router.put('/ReviewandRate/:TID',async(req,res)=>{
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
  const partnerID = ObjectId(authorizedData.id)
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
    
        notify( partnerID, assigneeID, `${partner.name} rated and reviewed your work on task: ${t.name}`)

          res.json("you're review and rate has been successfully added")
      }
       else {
          return res.send({error: 'task is not done yet'})
       }
    
      }
    
         
      } 
    }
  
    }
  });

 
});

//-------------------------------------partner view task's consultancies------------------------------------------// done with id, done with react
router.get("/viewConsultancy/:TID", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const partnerID = ObjectId(authorizedData.id);
      const taskIDb = parseInt(req.params.TID);
      const partner = await users.findOne(partnerID);
    
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
    }
  });
 
 
 
 
 

 
});     //eman's part starts here


//-----------------------------------partner choose a consultancy agency -------------------------------------------// done 
router.put('/ChooseConsultancyAgency/:idT/:idA',async(req,res)=>{
    jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      var flag=false;
      const PartID = ObjectId(authorizedData.id)
      const Task_id = parseInt(req.params.idT)
      const partner = await users.findOne(PartID)
      const consultancyID = ObjectId(req.params.idA)
      if(partner === null )
      res.json("the partner id is not correct")
  
      else {
        const task = partner.tasks
        const t = task.find(task => task.taskID === Task_id)
        
        if(t === null) res,json("the task Id is not correct")
        else{
          for(var i=0;i<t.consultancies.length;i++){
            if(t.consultancies[i].accepted===true)
            flag=true;
           }
        if(flag===false){
          const f = await users.findOneAndUpdate(
            {"_id":PartID},
            {
              $set: {
                "tasks.$[i].consultancies.$[j].accepted":true
     
              }
            },
      
            {
              arrayFilters: [
                { "i.taskID": Task_id },
                { "j.consultancyID": consultancyID  }
              ]
              
            }
          );
    
          notify( PartID, "", `${partner.name} accepted a consultancy agency for task: ${t.name}`)

        res.json({data:"you have successfully chosen a consultany"})
        
          
        }
        if(flag===true){
            res.json({data:"there exists an accepted applicant for the task"})
        }
      }
    }
    }
  });
 

});
//-----------------------------------partner view a task's life cycle -------------------------------------------// done  

router.get("/TaskLifeCycle/:TID", async (req, res) => {
    jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      const partnerID = ObjectId( authorizedData.id);
      const Task_id = parseInt(req.params.TID);
  
    const partner = await users.findOne(partnerID);
    const Task_Array = partner.tasks;
    if(partner === null )
  {res.json("the partner id is not correct")}
  else{
    const task = partner.tasks
      
      const t = task.find(task => task.taskID === Task_id)

      if(t === null) {res.json("the task Id is not correct")}
      else{
         var lifeCyc = [];

    for (var i = 0; i < Task_Array.length; i++) {
      if (Task_Array[i].taskID === Task_id) {
        lifeCyc = Task_Array[i].lifeCycle;
      }
    }
   console.log(lifeCyc)
    res.send(lifeCyc);
      }
    }

    }
  });
   
  
   
  });


//-----------------------------------partner send request to change description -------------------------------------------// done with id,done with react , need to handle other changes like name


router.put('/RequestDescriptionChange/:TID', async(req,res)=>{
  
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const PartID = ObjectId(authorizedData.id)
    const partner = await users.findOne(PartID)
    const Task_id = parseInt(req.params.TID)
    if(partner===null ) {
        res.json("the database has no partner with the given ID")
   } 
   else {
    const task = partner.tasks
    const task_to_update = task.find(task => task.taskID === Task_id)

    if(task_to_update === null) 
    res.json("this partner has no task with the given ID")

    else{
    const changes = req.body.description;
  
    
    const schema = {
      name: Joi.string(),
      description: Joi.string(),
      field:Joi.string(),
      skills:Joi.array()
        
     };
 
    const result = Joi.validate(req.body, schema);

    if(result.error){
        return  res.send(result.error.details[0].message)
       }

    else { 
 

        const newUpdate= 
            {id: PartID,
             TaskID: Task_id, 
             description: changes,
             status: 'pending'
            }
          ;
          const updates = partner.updates
          updates.push(newUpdate)

          const f = await users.findOneAndUpdate({"_id":PartID,},{$set: { "updates":updates}});
          notify( PartID, "", `${partner.name} requested a change for task: ${task_to_update.name}`)

    
            const partners = await users.findOne(PartID)
           res.json(partners.updates)
       }
    }
}
    }
  });
  
  
  
  
  
  
   
});


//--------------------------------partner view his/her profile------------------------------------------//
router.get("/viewProfile", async (req, res) => {

  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
    
      const partnerID = ObjectId(authorizedData.id);
  const partner = await users.findOne(partnerID);
  
  if(partner === null )
  {
    res.json("the partner id is not correct")
  }
  else{
    console.log(partner)
  res.json(partner) 
  }
    }
  });
 
 
});

//--------------------to book a room NOURHAN--------------------------//

router.get("/viewPartner/:id", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
     
  try {
    const partner = await User.findOne({
      _id: authorizedData.id
    });
    if (partner === undefined || member.length == 0)
      return res.json("Partner does not exist");
    res.json(member);

  } catch (error) {
    res.json(error.message);
  }
    }
  });

});
//--------------------for tha bar get profile ----------------------//
router.get("/myProfile", async (req, res) => {

  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
    
      const partnerID = ObjectId(authorizedData.id);
  const partner = await users.findOne(partnerID);
  
  if(partner === null )
  {
    res.json("the partner id is not correct")
  }
  else{
    console.log(partner)
  res.json(partner) 
  }
    }
  });
 
});

//-----------------------------------get all tasks for a partner-----------------------------//

router.get("/myTasks", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      
      const partnerID = ObjectId(authorizedData.id);
      const partner = await users.findOne(partnerID);
      
      if(partner === null )
      {
        res.json("the partner id is not correct")
      }
      else{
      res.json(partner.tasks) 
      }
    }
  });

 
});

//---------------------Get all bookings of a specific user----------------------------// done with front

router.get("/roombookings/", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      var userID = (authorizedData.id);

      const roombookings = await users.find(
        { _id: userID },
        { RoomsBooked: 1, _id: 0 }
      );
    
      res.json( roombookings.pop().RoomsBooked );
    }
  });
 
 
 
 
  
});
//--------------------------get a schedule room in a specific coworking space by id------------------//

router.get("/cospace/rooms/:id/:id2", async (req, res) => {
  try {
    const test = await User.aggregate([
      { $unwind: "$rooms" },

      {
        $match: {
          "_id": ObjectId(req.params.id),
          type: "coworkingSpace",
          "rooms._id": ObjectId(req.params.id2)
        }
      },

      { $project: { schedule: "$rooms.schedule", _id: 0 } }
    ]);
    res.json(test.pop().schedule);
  } catch (error) {
    res.send("not found");

  }
});


//--------------------------book a room , append it to the array of bookings if it is not in my bookings----------------------------//

router.put("/cospace/rooms/:id/:id2/:id3", async (req, res) => {
  
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const schedID = objectid(req.params.id3);

      const cospaceID = objectid(req.params.id);
    
      const roomID = objectid(req.params.id2);
    
      try {
        const test1 = await User.aggregate([
          { $unwind: "$rooms" },
    
          { $unwind: "$rooms.schedule" },
    
          {
            $match: {
              "_id": (cospaceID),
              type: "coworkingSpace",
              "rooms._id": (roomID),
              "rooms.schedule._id": (schedID)
            }
          },
    
          { $project: { reserved: "$rooms.schedule.reserved", _id: 0 } }
        ]);
    
        //res.send(test1.pop().reserved == "true")
        //console.log(test1)
        if (test1.pop().reserved) return res.send({ data: "already reserved" });
    
        const test = await User.aggregate([
          { $unwind: "$rooms" },
    
          { $unwind: "$rooms.schedule" },
    
          {
            $match: {
              "_id": (cospaceID),
              type: "coworkingSpace",
              "rooms._id": (roomID),
              "rooms.schedule._id": (schedID)
            }
          },
    
          { $project: { date: "$rooms.schedule.Date", _id: 0 } }
        ]);
        const test3 = await User.aggregate([
          { $unwind: "$rooms" },
    
          { $unwind: "$rooms.schedule" },
    
          {
            $match: {
              "_id": (cospaceID),
              type: "coworkingSpace",
              "rooms._id": (roomID),
              "rooms.schedule._id": (schedID)
            }
          },
    
          { $project: { time: "$rooms.schedule.time", _id: 0 } }
        ]);
    
        const f = await User.findOneAndUpdate(
          {
            "_id": (cospaceID)
          },
    
          {
            $set: {
              "rooms.$[i].schedule.$[j].reserved": true,
              "rooms.$[i].schedule.$[j].reservedBy": {
                uid: (req.params.userID)
              }
            }
          },
    
          {
            arrayFilters: [
              { "i._id": (roomID) },
              { "j._id": (schedID) }
            ]
          }
        );
    
        const test0 = await User.aggregate([
          { $unwind: "$rooms" },
    
          { $unwind: "$rooms.schedule" },
    
          {
            $match: {
              "_id": (cospaceID),
              type: "coworkingSpace",
              "rooms._id": (roomID),
              "rooms.schedule._id": (schedID)
            }
          },
    
          { $project: { reserved: "$rooms.schedule.reserved", _id: 0 } }
        ]);
    
        const coName = await User.find({
          type: "coworkingSpace",
          "_id": (cospaceID)
        });
    
        const rName = await User.aggregate([
          { $unwind: "$rooms" },
    
          { $unwind: "$rooms.schedule" },
    
          {
            $match: {
              "_id": (cospaceID),
              type: "coworkingSpace",
              "rooms._id": (roomID),
              "rooms.schedule._id": (schedID)
            }
          },
    
          { $project: { rNO: "$rooms.roomNumber", _id: 0 } }
        ]);
    
        await User.findOneAndUpdate(
          { "_id": (authorizedData.id) },
          {
            $addToSet: {
              RoomsBooked: {
                bookingID: new objectid(),
                coworkingSpaceID: (cospaceID),
                coworkingSpaceName: (coName.pop().name),
                roomName: ('Room'+rName.pop().rNO),
                roomID: (roomID),
    
                scheduleID: (schedID),
                Date: test.pop().date,
                time: test3.pop().time
              }
            }
          },
    
          async function(err, model) {
            if (err) return handleError(res, err);
            else res.json({ data: test0.pop().reserved });
          }
        );
      } catch (error) {
        console.log(error);
    
        res.send("Not found");
      }
    }
  });
  
 
});


//-----------------------delete booking and set the reservation boolean to false so others can now book it------------------------//
router.delete("/RoomBookings/:bookingID", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {

       // try{
  const test = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": ObjectId(authorizedData.id),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { "RoomsBooked.bookingID": 1, _id: 0 } }
  ]);

  if (test == 0) return res.send({ data: "booking does not exist." });

  const test1 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": ObjectId(authorizedData.id),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { cospaceID: "$RoomsBooked.coworkingSpaceID", _id: 0 } }
  ]);
  const test2 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": ObjectId(authorizedData.id),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { roomid: "$RoomsBooked.roomID", _id: 0 } }
  ]);
  const test3 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": ObjectId(authorizedData.id),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { scheduID: "$RoomsBooked.scheduleID", _id: 0 } }
  ]);

  const f = await User.findOneAndUpdate(
    {
      "_id": test1.pop().cospaceID
    },

    {
      $set: {
        "rooms.$[i].schedule.$[j].reserved": false,
        "rooms.$[i].schedule.$[j].reservedBy": {}
      }
    },
    {
      arrayFilters: [
        { "i._id": test2.pop().roomid },
        { "j._id": test3.pop().scheduID }
      ]
    }
  );

  const y = await User.update(
    { "_id":ObjectId(authorizedData.id) },
    { $pull: { RoomsBooked: { bookingID: objectid(req.params.bookingID) } } },
    { multi: true },
    async function(err, model) {
      if (err) return handleError(res, err);
      else {
        res.json({ data: "reservation was deleted successfully" });
      }
    }
  );


    }
  });
   
});




module.exports = router
