//--------------------express--------------------
const express = require("express");
const router = express.Router();
var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId;
const Joi = require("joi");
const notifier = require("node-notifier");
const cron = require("cron");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys").secretOrKey;
var store = require("store");
var CronJob = require('cron').CronJob;

//--------------------models--------------------
const users = require("../../models/UserProfile");
const message = require("../../models/messages");

//-------------------pathToSendFile----------------------------
var path = require("path");
const passport = require("passport");

//--------------------get contact info of partner--------------------

router.get("/contact/:pid", async (req, res) => {
  var partner = parseInt(req.params.pid);

  await users.find(
    { userID: partner },
    { email: 1, phoneNumber: 1, _id: 0 },
    (err, r) => {
      res.send(r);
    }
  );
});

//-----------------------chat-----------------------------

router.get("/chat", function(req, res) {
  res.sendFile(path.resolve("./indexx.html"));
});

//--------------------see all updates--------------------
router.get("/viewUpdates", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      if (authorizedData.type === "admin") {
        const updt = await users.find({}, { updates: 1, _id: 1 });
        for (var i = 0; i < updt.length; i++) {
          if (!updt[i] || !updt[i].updates || updt[i].updates.length === 0) {
            updt.splice(i, 1);
            i -= 1; //since array is shifted when we splice
          }
        }
        if (!updt || updt.length === 0)
          return res.status(404).send({ error: "No updates found" });
        res.json(updt);
      } else {
        res.sendStatus(403);
      }
    }
  });
});
//--------------------approve updates--------------------
router.put("/approveUpdates/:id/:uid", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      if (authorizedData.type === "admin") {
        try {
          const userid = req.params.id;

          const updtid = parseInt(req.params.uid);

          const user = await users.findById(userid);
          if (!user || user.length === 0)
            return res.status(404).send({ error: "User does not exist" });

          const update = await users.find(
            { _id: userid, "updates._id": updtid },
            { updates: 1 }
          );
          if (
            !update ||
            update.length === 0 ||
            !update[0] ||
            !update[0].updates[0]
          )
            return res.status(404).send({ error: "Update does not exist" });

          //user may want to deactivate or activate account, therefore, activation can be changed
          const newusers = {
            type:
             ( update[0].updates[0].type === undefined || update[0].updates[0].type === null)
                ? user.type
                : update[0].updates[0].type,
            name:
             (update[0].updates[0].name === undefined || update[0].updates[0].name === null)
                ? user.name
                : update[0].updates[0].name,
            email:
              (update[0].updates[0].email === undefined || update[0].updates[0].email === null)
                ? user.email
                : update[0].updates[0].email,
            phoneNumber:
              (update[0].updates[0].phoneNumber === undefined || update[0].updates[0].phoneNumber === null)
                ? user.phoneNumber
                : update[0].updates[0].phoneNumber,
            field:
              (update[0].updates[0].field === undefined || update[0].updates[0].field === null)
                ? user.field
                : update[0].updates[0].field,
            memberTasks:
              (update[0].updates[0].memberTasks === undefined || update[0].updates[0].memberTasks === null)
                ? user.memberTasks
                : update[0].updates[0].memberTasks,
            activation:
              (update[0].updates[0].activation === undefined || update[0].updates[0].activation === null)
                ? user.activation
                : update[0].updates[0].activation,
            address:
             (update[0].updates[0].address === undefined || update[0].updates[0].address === null)
                ? user.address
                : update[0].updates[0].address,
            birthday:
              (update[0].updates[0].birthday === undefined || update[0].updates[0].birthday === null)
                ? user.birthday
                : update[0].updates[0].birthday,
            skills:
              (update[0].updates[0].skills === undefined || update[0].updates[0].skills === null)
                ? user.skills
                : update[0].updates[0].skills,
            interests:
              (update[0].updates[0].interests === undefined || update[0].updates[0].interests === null)
                ? user.interests
                : update[0].updates[0].interests,
            accomplishments:
              (update[0].updates[0].accomplishments === undefined || update[0].updates[0].accomplishments === null)
                ? user.accomplishments
                : update[0].updates[0].accomplishments,
            trainers:
              (update[0].updates[0].trainers === undefined || update[0].updates[0].trainers === null)
                ? user.trainers
                : update[0].updates[0].trainers,
            trainingPrograms:
             (update[0].updates[0].trainingPrograms === undefined || update[0].updates[0].trainingPrograms === null)
                ? user.trainingPrograms
                : update[0].updates[0].trainingPrograms,
            partners:
              (update[0].updates[0].partners === undefined || update[0].updates[0].partners === null)
                ? user.partners
                : update[0].updates[0].partners,
            boardMembers:
              (update[0].updates[0].boardMembers === undefined || update[0].updates[0].boardMembers === null)
                ? user.boardMembers
                : update[0].updates[0].boardMembers,
            events:
             ( update[0].updates[0].events === undefined || update[0].updates[0].events === null)
                ? user.events
                : update[0].updates[0].events,
            reports:
              (update[0].updates[0].reports === undefined ||  update[0].updates[0].reports === null)
                ? user.reports
                : update[0].updates[0].reports,
            tasks:
             (update[0].updates[0].tasks === undefined || update[0].updates[0].tasks === null)
                ? user.tasks
                : update[0].updates[0].tasks,
            certificates:
              (update[0].updates[0].certificates === undefined || update[0].updates[0].certificates === null)
                ? user.certificates
                : update[0].updates[0].certificates,
            website:
              (update[0].updates[0].website === undefined || update[0].updates[0].website === null)
                ? user.website
                : update[0].updates[0].website,
            description:
              (update[0].updates[0].description === undefined || update[0].updates[0].description === null)
                ? user.description
                : update[0].updates[0].description,
            facilities:
              (update[0].updates[0].facilities === undefined || update[0].updates[0].facilities === null)
                ? user.facilities
                : update[0].updates[0].facilities,
            rooms:
              (update[0].updates[0].rooms === undefined || update[0].updates[0].rooms === null)
                ? user.rooms
                : update[0].updates[0].rooms
          };

          const updatedUser = await users.update(
            { _id: userid },
            {
              $set: {
                type: newusers.type,
                name: newusers.name,
                email: newusers.email,
                phoneNumber: newusers.phoneNumber,
                field: newusers.field,
                memberTasks: newusers.memberTasks,
                activation: newusers.activation,
                address: newusers.address,
                birthday: newusers.birthday,
                skills: newusers.skills,
                interests: newusers.interests,
                accomplishments: newusers.accomplishments,
                trainers: newusers.trainers,
                trainingPrograms: newusers.trainingPrograms,
                partners: newusers.partners,
                boardMembers: newusers.boardMembers,
                events: newusers.events,
                reports: newusers.reports,
                tasks: newusers.tasks,
                certificates: newusers.certificates,
                website: newusers.website,
                description: newusers.description,
                facilities: newusers.facilities,
                rooms: newusers.rooms
              }
            }
          );

          const approve = await users.update(
            { _id: userid, "updates._id": updtid },
            { $pull: { updates: { _id: updtid } } }
          );

          notify("",userid, "Your profile has been updated successfully");

          res.json({ msg: "User updated successfully" });
        } catch (error) {
          console.log(error);
        }
      } else {
        res.sendStatus(403);
      }
    }
  });
});

//--------------------disapprove updates--------------------
router.delete("/disapproveUpdates/:id/:uid", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      if (authorizedData.type === "admin") {
        try {
          const userid = req.params.id;

          const updtid = parseInt(req.params.uid);

          const user = await users.findById(userid);
          if (!user || user.length === 0)
            return res.status(404).send({ error: "User does not exist" });

          const update = await users.find(
            { "updates._id": updtid },
            { updates: 1 }
          );
          if (!update || update.length === 0)
            return res.status(404).send({ error: "Update does not exist" });

          const del = await users.update(
            { _id: userid, "updates._id": updtid },
            { $pull: { updates: { _id: updtid } } }
          );

          notify("",
            userid,
            "Sorry your update request was disapproved by an admin"
          );

          res.json({
            msg: "Sorry your update request was disapproved by an admin"
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        res.sendStatus(403);
      }
    }
  });
});

//-------------------------------------------------------------------------------------------------------
//======================================================================================================
//-------------------------------------------------------------------------------------------------------
//--------------------------------------notification with Mail-------------------------------------------

function sendMailToUsers(recieverEmail, subjectff, textxxx) {
  const subjectttt = subjectff;
  const textggg = textxxx;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "breakitdown.se@gmail.com",
      pass: "break_1234"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: "breakitdown.se@gmail.com",
    to: recieverEmail,
    subject: subjectttt,
    text: textggg
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //  html: "<b>Hello world?</b>" // html body
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log("something went wrong please try again later ");
    } else {
      console.log(recieverEmail);
      console.log("email sent successfully");
    }
  });
}

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

//--------------------------------------NotifyUsersToSignContract-------------------------------------------
router.put("/NotifyUsersToSignContract/:PID", async (req, res) => {
  
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      if(authorizedData.type ==="admin"){
        const PartID = req.params.PID;
        const partner = await users.findOne({ '_id': PartID });
        const email = partner.email;
        const name = partner.name;
        console.log(email);
  
        const { time, date, location } = req.body;

          const message = `Hi ${name}! 
                          Thanks for signing up with LirtenHub.
                          To verify your account please meet with one of our team on ${date} at ${time} in ${location}.
                          If the time doesn't suite you, please contact us through our email.`;
  
          // const subject =  "Urgent! LirtenHub Contract & Agreement"
          sendMailToUsers(
            email,
            "Urgent! LirtenHub Contract & Agreement",
            message,
            function(err, data) {
              if (err) {
                res.json(err);
              }
              res.json("email sent successfully");
            }
          );
        
      }
     else{
       res.sendStatus(403);
     }

    }
  });

});

//--------------------------------------notify users with expiry of their contract-------------------------------------------
async function deactivateAccount(id) {
  const activate = false;
  users.updateOne({ _id: id }, { $set: { activation: activate } }, function(
    err,
    model
  ) {});

  // const user = await users.findOne({'_id':MemID})
  // res.json(user)
}

function Noofmonths(date1, date2) {
  var Nomonths;
  //console.log(date1)
  Nomonths = (date2.getFullYear() - date1.getFullYear()) * 12;
  Nomonths -= date1.getMonth() + 1;
  Nomonths += date2.getMonth() + 1; // we should add + 1 to get correct month number
  return Nomonths <= 0 ? 0 : Nomonths;
}

async function checkExpiryDatePartner(currentDate) {
  const userIds = await users.find({ type: "partner" });
  userIds.forEach(element => {
    const activatedOn = element.membershipExpiryDate;
    const difference = Noofmonths(new Date(activatedOn), new Date(currentDate));
  //  console.log(difference, element.name);

    if (difference === 11) {
      // console.log('11 months passed')
      // return('11 months passed')

      const message = `Hi ${element.name}! 
                          Your contract with LirtenHub is almost Expired.
                          Please contact one of our team, If you are willing to renew your contract with LirtenHub.
                          Otherwise, your account unfortunately will be deactivated.
                          `;

      const email = element.email;
      sendMailToUsers(
        email,
        "Urgent! LirtenHub Account & Contract Expiration",
        message,
        function(err, data) {
          if (err) {
            res.json(err);
          }
          res.json("email sent successfully");
        }
      );
    } else if (difference > 11) {
      // console.log('not yet')
      // return('not yet')
      deactivateAccount(element._id);
      console.log("----------------");
      console.log(element.name);
    }
  });
}

async function checkExpiryDateMember(currentDate) {
  const userIds = await users.find({ type: "member" });
  userIds.forEach(element => {
    const activatedOn = element.membershipExpiryDate;
    const difference = Noofmonths(new Date(activatedOn), new Date(currentDate));
    //console.log(difference, element.name);

    if (difference === 11) {
      // console.log('11 months passed')
      // return('11 months passed')

      const message = `Hi ${element.name}! 
                        Your contract with LirtenHub is almost Expired.
                        Please contact one of our team, If you are willing to renew your contract with LirtenHub.
                        Otherwise, your account unfortunately will be deactivated.
                        `;

      const email = element.email;
      sendMailToUsers(
        email,
        "Urgent! LirtenHub Account & Contract Expiration",
        message,
        function(err, data) {
          if (err) {
            res.json(err);
          }
          res.json("email sent successfully");
        }
      );
    } else if (difference > 11) {
      // console.log('not yet')
      // return('not yet')
      deactivateAccount(element._id);
      console.log("----------------");
      console.log(element.name);
    }
  });
}

async function checkExpiryDateCS(currentDate) {
  const userIds = await users.find({ type: "coworkingSpace" });
  userIds.forEach(element => {
    const activatedOn = element.membershipExpiryDate;
    const difference = Noofmonths(new Date(activatedOn), new Date(currentDate));
    //console.log(difference, element.name);

    if (difference === 11) {
      // console.log('11 months passed')
      // return('11 months passed')

      const message = `Hi ${element.name}! 
                        Your contract with LirtenHub is almost Expired.
                        Please contact one of our team, If you are willing to renew your contract with LirtenHub.
                        Otherwise, your account unfortunately will be deactivated.
                        `;

      const email = element.email;
      sendMailToUsers(
        email,
        "Urgent! LirtenHub Account & Contract Expiration",
        message,
        function(err, data) {
          if (err) {
            res.json(err);
          }
          res.json("email sent successfully");
        }
      );
    } else if (difference > 11) {
      // console.log('not yet')
      // return('not yet')
      deactivateAccount(element._id);
      console.log("----------------");
      console.log(element.name);
    }
  });
}

async function checkExpiryDateCA(currentDate) {
  const userIds = await users.find({ type: "consultancyAgency" });
  userIds.forEach(element => {
    const activatedOn = element.membershipExpiryDate;
    const difference = Noofmonths(new Date(activatedOn), new Date(currentDate));
    //console.log(difference, element.name);

    if (difference === 11) {
      // console.log('11 months passed')
      // return('11 months passed')

      const message = `Hi ${element.name}! 
                        Your contract with LirtenHub is almost Expired.
                        Please contact one of our team, If you are willing to renew your contract with LirtenHub.
                        Otherwise, your account unfortunately will be deactivated.
                        `;

      const email = element.email;
      sendMailToUsers(
        email,
        "Urgent! LirtenHub Account & Contract Expiration",
        message,
        function(err, data) {
          if (err) {
            res.json(err);
          }
          res.json("email sent successfully");
        }
      );
    } else if (difference > 11) {
      // console.log('not yet')
      // return('not yet')
      deactivateAccount(element._id);
      console.log("----------------");
      console.log(element.name);
    }
  });
}

var todate = new Date();
var date = todate.getFullYear() + "-" + (todate.getMonth() + 1) + "-" + todate.getDate();

  new CronJob('0,0  * * * 5', function() {
      console.log("--------Partner--------"),
      checkExpiryDatePartner(todate)
      console.log("--------Member--------"),
      checkExpiryDateMember(todate),
      console.log("----------CS----------"),
      checkExpiryDateCS(todate),
      console.log("----------CA----------"),
      checkExpiryDateCA(todate)
  }, null, true, 'America/Los_Angeles');

  new CronJob('0,30  * * * *', function() {
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
  

//--------------------------- admin check task description ---------------------------------------------
router.get("/CheckTaskDescriptions/:PID/:TID", async (req, res) => {
    jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        if(authorizedData.type === "admin"){
          const id = req.params.PID;
          const PartID = ObjectId(id);
          const partner = await users.findOne(PartID);
          const Task_id = parseInt(req.params.TID);
      
          if (partner === null) {
            res.json("the database has no partner with the given ID");
          } else {
            const partner2 = await users.findOne(PartID);
      
            const task = partner2.tasks;
            const task_to_check = task.find(task => task.taskID === Task_id);
            res.json(task_to_check);
          }
        }
        else{
          res.sendStatus(403)
        }
      }
    });
});

//
//-------------------------- admin post task on main ----------------------------------------------------------
// partner id and task id are passed to the method to be able to access the required task to be checked  whether its approved or not

router.get("/getUnapprovedTasks", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      if(authorizedData.type ==="admin"){
          const user = await users.find({type:'partner'})
          var hell=[]
          for(var i=0; i<user.length; i++ ){
            for(var j=0;j<user[i].tasks.length;j++){
              if(user[i].tasks[j].approved===false){
                hell.push(user[i].tasks[j])
              }    
            }
          }
  res.json(hell)
}
else{
  res.sendStatus(403);
}

}
});
});

router.put("/ApproveTasks/:PID/:TID", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      if(authorizedData.type === "admin"){
        const adminID = ObjectId(authorizedData.id);
        const id = req.params.PID;
        const PartID = ObjectId(id);
        const partner = await users.findOne(PartID);
        const Task_id = parseInt(req.params.TID);
      
        if (partner === null) {
          res.json("the database has no partner with the given ID");
        } else {
          const task = partner.tasks;
          const task_to_post = task.find(task => task.taskID === Task_id);
      
          if (task_to_post === null)
            res.json("this partner has no task with the given ID");
          else {
            const f = await users.findOneAndUpdate(
              { _id: PartID },
              {
                $set: {
                  "tasks.$[i].approved": true,
                  "tasks.$[i].lirtenHubVerified": true,
                  "tasks.$[i].lifeCycle.0": true
                }
              },
      
              {
                arrayFilters: [{ "i.taskID": Task_id }]
              }
            );
            
            const name =task_to_post.name
            notify("", PartID, `Task ${name} was approved!`);

            const partners = await users.findOne(PartID);
            const x = partners.tasks;
            const task_to_post2 = x.find(task => task.taskID === Task_id);
            res.json(task_to_post2);
          }
        }
      }
      else{
        res.sendStatus(403)
      }
    }
  });
  

});

router.delete("/DisapproveTasks/:PID/:TID", async (req, res) => {
 
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      if(authorizedData.type === "admin"){
        const adminID = ObjectId(authorizedData.id);
        const PartID = ObjectId(req.params.PID);
        const partner = await users.findOne(PartID);
        const Task_id = parseInt(req.params.TID);
      
        if (partner === null) {
          res.json("the database has no partner with the given ID");
        } else {
          const task = partner.tasks;
          const task_to_post = task.find(task => task.taskID === Task_id);
      
          if (task_to_post === null)
            res.json("this partner has no task with the given ID");
          else {

            const del = await users.update(
              { _id: PartID, "tasks.taskID": Task_id },
              { $pull: { tasks: { taskID: Task_id } } }
            );


            const name =task_to_post.name
   
            notify("", PartID, `Task ${name} was not approved!`);

            const partners = await users.findOne(PartID);
            const x = partners.tasks;
            const task_to_post2 = x.find(task => task.taskID === Task_id);
            res.json(task_to_post2);
          }
        }
      }
      else{
        res.sendStatus(403)
      }
    }
  });


});

//----------------------------- admin activate user's account---------------------------------------------
router.put("/ActivateAccounts/:MID", async (req, res) => {
 
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } 
    
    else {
      if(authorizedData.type === "admin"){
        const MemID = req.params.MID;
        const activate = true;
      
        var todate = new Date();
        var date = todate.getFullYear() + "-" + (todate.getMonth() + 1) + "-" + todate.getDate();
        var time = todate.getHours() + ":" + todate.getMinutes() + ":" + todate.getSeconds();
        var dateTime = date + " " + time;
        //console.log(dateTime);
      
        users.updateOne(
          { _id: MemID },
          { $set: { activation: activate, membershipExpiryDate: dateTime, signedIn: true } },
          function(err, model) {}
        );
      
        const user = await users.findOne({ _id: MemID });
        res.json("account activated successfully")
        console.log("account activated successfully")

        const email = user.email;
        const name = user.name;
        console.log(email);

        const message = `Hi ${name}! 
                        Your account with LirtenHub has been successfully activated.
                        Working hard becomes a habit, a serious kind of fun.
                        You get self-satisfaction from pushing yourself to the limit, knowing that all the effort is going to pay off.
                        So don't give up ^-^. `;
  
  
        sendMailToUsers(
          email,
          "Urgent! LirtenHub Account Activation",
          message,
          function(err, data) {
            if (err) {
              res.json(err);
            }
            res.json("email sent successfully");
          }
        );

      }
      else{
        res.sendStatus(403);
      }
    }
  });
});

//----------------------------- admin get all deactivated accounts---------------------------------------------
router.get('/getDeactivatedAccounts', async(req, res)=>{

  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } 
    else {
      if(authorizedData.type === "admin"){
        const deactivatedUsers = await users.find({'activation':false})
        res.json(deactivatedUsers)
      //  console.log(deactivatedUsers)
      }
      else{
        res.sendStatus(403);
      }
    }
  });
});

//----------------------------- admin get unregistered users---------------------------------------------
router.get('/getUnregisteredUsers', async(req, res)=>{

  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } 
    else {
      if(authorizedData.type === "admin"){
        const deactivatedUsers = await users.find({ 'signedIn':false})
        res.json(deactivatedUsers)
        //console.log(deactivatedUsers)
      }
      else{
        res.sendStatus(403);
      }
    }
  });
});

//---------------------------------admin assigning the chosen member by partner as an engine with no routes-------------------- 
async function assignMembers(){ 
  var flag=true;
  const partners = await users.find({'type':"partner"} )

  if(partners === undefined || partners.length === 0)
     console.log("no partners found")

  else {
    partners.forEach(async element => {
      const tasks= element.tasks
      const PartID= element._id

      if( tasks === undefined || tasks.length === 0){
       // console.log('1 -->'+element.name)
       // console.log("no tasks for this partner")
      }

      else{
      tasks.forEach(async element2 => {
        const Task_id = element2.taskID
        const applicants =element2.applicants

        if( applicants === undefined || applicants.length === 0 ){
         // console.log("no applicants for this task")
        // console.log('2 -->'+element.name)
        }
  
        else{
        const acceptedApplicant = applicants.find(applicant=> applicant.accepted === true)

        if(acceptedApplicant === undefined || acceptedApplicant.length === 0 ){
         // console.log('no applicant was accepted by the partner yet')
        }

        else{
        const applicantID = acceptedApplicant.applicantID
        //console.log('applicantID:  '+applicantID)
       // console.log('3 -->'+element.name)
        for(var i=0;i<applicants.length;i++){
             if(applicants[i].assigned===true)
            flag=false
         }

         if(flag===true){
          await users.findOneAndUpdate(
            {"_id":PartID},
            { $set: { "tasks.$[i].applicants.$[j].assigned":true,
                      "tasks.$[i].lifeCycle.1":true,
                      "tasks.$[i].assigneeID":applicantID     
            }},
            { arrayFilters: [
                { "i.taskID": Task_id },
                { "j.applicantID": applicantID  }
          ]});

          const u = await users.findOne({ _id: applicantID });
          notify( "", PartID, `${u.name} was assigned to task: ${element2.name}`)
          notify( "", applicantID, `You were assigned to task: ${element2.name}`)

          const partner = await users.findOne({ _id: PartID });

          if (partner === null)
            res.json("either the partner or the task id is not correct");
          else {
            const task = partner.tasks;
            const t = task.find(task => task.taskID === Task_id);
            console.log(t)
             await users.updateOne(
                { _id: applicantID },
                { $push: { memberTasks : t } },
                function(err, model) {});
                
          }

        }}}
      });
      flag = true;
    }});
}}
assignMembers();

//---------------------------------admin assigning the chosen member by partner as an engine with no routes-------------------- 
async function assignConsultancyAgency(){
  var flag=true;
  const partners = await users.find({'type':"partner"} )

  if(partners === undefined || partners.length === 0)
     console.log("no partners found")

  else {
    partners.forEach(async element => {
      const tasks= element.tasks
      const PartID= element._id

      if( tasks === undefined || tasks.length === 0){
       // console.log('1 -->'+element.name)
     //   console.log("no tasks for this partner")
      }

      else{
      tasks.forEach(async element2 => {
        const Task_id = element2.taskID
        const consultancies =element2.consultancies

        if( consultancies === undefined || consultancies.length === 0 ){
          //console.log('2 -->'+element.name) 
     //     console.log("no consultancies applied for this task")
        }
  
        else{
        const acceptedConsultancy = consultancies.find(consultancy=> consultancy.accepted === true)


        if(acceptedConsultancy === undefined || acceptedConsultancy.length === 0 ){
     //     console.log('no consultancy was accepted by the partner yet')
        }

        else{
        const consultancyID = acceptedConsultancy.consultancyID
      //  console.log('3 -->'+element.name)
        for(var i=0;i<consultancies.length;i++){
             if(consultancies[i].assigned===true)
            flag=false
         }

         if(flag===true){
           await users.findOneAndUpdate(
            {"_id":PartID,},
            { $set: { "tasks.$[i].consultancies.$[j].assigned":true,
                      "tasks.$[i].consultancyAssignedID":consultancyID     
            }},
            { arrayFilters: [
                { "i.taskID": Task_id },
                { "j.consultancyID": consultancyID  }
            ]});
  
            const u = await users.findOne({ _id: consultancyID });
            notify( "", PartID, `${u.name} Consultancy Agency was assigned to task: ${element2.name}`)
            notify( "", consultancyID, `You were assigned to task: ${element2.name}`)
  
            const partner = await users.findOne({ _id: PartID });
            if (partner === null)
              res.json("either the partner or the task id is not correct");
            else {
              const task = partner.tasks;
              const t = task.find(task => task.taskID === Task_id);
              console.log(t)
               await users.updateOne(
                  { _id: consultancyID },
                  { $push: { consultancyTasks : t } },
                  function(err, model) {});
            }
        }}}
      });
      flag = true;
    }});
}}
assignConsultancyAgency();

//---------------------------------send push notification to users-------------------- 
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

 // notify(sender id,  reciever id , message)
 // for notifying the admin --> reciever id--> ""
 notify( "","5c9114781c9d440000a926ce", "admin to partner")
 notify( "5c9114781c9d440000a926ce","5cba37e26f7e976658a4cb00", "partner to member")
 notify( "5c9114781c9d440000a926ce","", "partner to admin")

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
//===================================================================================================================================
//===================================================================================================================================

//----------------------------------view messages----------------------------------
router.get("/viewmessages", async (req, res) => {
  const updt = await message.find();
  res.json({ data: updt });
});

//---------------------------------get all admins--------------------------------------

router.get("/", async (req, res) => {
  const admins = await users.find({ type: "admin" });
  res.json(admins);
});

//---------------------------------get all users--------------------------------------

router.get("/viewUser/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await users.find({ _id: userId }, { updates: 0 });
  res.json(user[0]);
});

router.get("/viewAdmin", (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      try {
        const ad = await users.findOne({
          type: "admin",
          _id: authorizedData.id });
        if (ad=== undefined || ad.length == 0)
          return res.json("Admin does not exist");
        res.json(ad);
      } catch (error) {
        res.json(error.message);
      }
      console.log("SUCCESS: Connected to protected route");
    }
  });
});

router.get("/viewAll", (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      try {
        const ad = await users.findOne({
          _id: authorizedData.id });
        if (ad=== undefined || ad.length == 0)
          return res.json("User does not exist");
        res.json(ad);
      } catch (error) {
        res.json(error.message);
      }
      console.log("SUCCESS: Connected to protected route");
    }
  });
});


module.exports = router;
