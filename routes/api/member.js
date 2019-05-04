// Dependencies
const express = require("express");
const Joi = require("joi");
const uuid = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");
// Models should be removed
const User = require("../../models/UserProfile");
const users = require("../../models/UserProfile");
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys").secretOrKey;
var store = require("store");
//nourhan
var objectid = require("mongodb").ObjectID;
var ObjectId = require("mongodb").ObjectID;

var Members = require("../../models/Member");
var partner = require("../../models/Partner");
const PartnerCoworkingSpace = require("../../models/cospaceMTest");
const RoomBookings = require("../../models/RoomBookings");
const underscore = require("underscore");
//------------------------------push notifications---------------------------
var CronJob = require('cron').CronJob;
const notifier = require("node-notifier");

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

//---------------------------------------------Mariam----------------------------------------------------------
//--------------------filter tasks--------------------
router.get("/filterTasks", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      try {
        //Member skills: array of strings
        const memberSkills = await users.findOne(
          { type: "member", _id: authorizedData.id },
          { skills: 1, _id: 0 }
        );
        //return res.json(memberSkills)
        //Member field
        const memberField = await users.findOne(
          { type: "member", _id: authorizedData.id },
          { field: 1, _id: 0 }
        );
        //return res.json(memberField)

        //Resulting tasks
        var recommendedTasks = [];
        //All partner tasks: array of objects & each obj is an array having the tasks (objects) of a certain partner
        const grptasks = await users.find(
          { type: "partner" },
          { tasks: 1, _id: 0 }
        );
        for (var i = 0; i < grptasks.length; i++) {
          for (var j = 0; j < grptasks[i].tasks.length; j++) {
            const temp = grptasks[i].tasks[j];
            if (temp.approved !== undefined && temp.lifeCycle !== undefined) {
              if (temp.approved && !temp.lifeCycle[1]) {
                if (
                  temp.field === memberField.field &&
                  underscore.intersection(memberSkills.skills, temp.skills)
                    .length >= 1
                ) {
                  recommendedTasks.push(temp);
                } //return res.json(grptasks[i].tasks[j])
                else if (
                  underscore.intersection(memberSkills.skills, temp.skills)
                    .length >= 2
                ) {
                  recommendedTasks.push(temp);
                }
              }
            }
          }
        }
        res.json(recommendedTasks);
      } catch (error) {
        res.send(error);
      }
    }
  });
});
//Search  coworking spaces by location and capacity
router.get("/PartnerCoworkingspaces/Filter", (req, res) => {
  if (req.body.location && req.body.capacity)
    PartnerCoworkingSpace.find({
      $and: [
        { address: req.body.location },
        { "rooms.capacity": req.body.capacity }
      ]
    }).then(p =>
      !p
        ? res.json({ msg: "No coworking space with your specifications found" })
        : res.json(p)
    );
  if (req.body.location && !req.body.capacity)
    PartnerCoworkingSpace.find({ address: req.body.location }).then(p =>
      !p
        ? res.json({ msg: "No coworking space with your specifications found" })
        : res.json(p)
    );
  if (!req.body.location && req.body.capacity)
    PartnerCoworkingSpace.find({ "rooms.capacity": req.body.capacity }).then(
      p =>
        !p
          ? res.json({
              msg: "No coworking space with your specifications found"
            })
          : res.json(p)
    );
});

//shaza
//get the coworking space by id
router.get("/PartnerCoworkingspaces/:id", async (req, res) => {
  const Users = await User.find({
    type: "coworkingSpace",
    _id: req.params.id
  });
  //	if({Users:[]}) return res.json('Coworking space does not exist')
  res.json(Users);
});

//Get specific member -Mariam
router.get("/viewMember/:id", async (req, res) => {
  try {
    const member = await User.findOne({
      type: "member",
      _id: objectid(req.params.id)
    });
    if (member === undefined || member.length == 0)
      return res.json("Member does not exist");
    res.json(member);
  } catch (error) {
    res.json(error.message);
  }
});

//view all coworking spaces
router.get("/PartnerCoworkingspaces", async (req, res) => {
  const Users = await User.find({ type: "coworkingSpace" });
  res.json(Users);
});

// Get all Members (Malak&Nour) MONGOUPDATED
router.get("/viewAllMembers", async (req, res) => {
  // Members.find()
  // .then(items=>res.json(items))
  const r = await User.find({ type: "member" });
  res.json(r);
});

//---------------------Get all bookings of a specific user----------------------------// done with front

router.get("/roombookings/", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      var userID = authorizedData.id;

      const roombookings = await users.find(
        { _id: userID },
        { RoomsBooked: 1, _id: 0 }
      );

      res.json(roombookings.pop().RoomsBooked);
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
          _id: objectid(req.params.id),
          type: "coworkingSpace",
          "rooms._id": objectid(req.params.id2)
        }
      },

      { $project: { schedule: "$rooms.schedule", _id: 0 } }
    ]);
    res.json(test.pop().schedule);
  } catch (error) {
    res.send("not found");

    //console.log("error");
  }
});

//--------------------------book a room , append it to the array of bookings if it is not in my bookings----------------------------//

router.put("/cospace/rooms/:userID/:id/:id2/:id3", async (req, res) => {
  const schedID = objectid(req.params.id3);

  const cospaceID = objectid(req.params.id);

  const roomID = objectid(req.params.id2);

  try {
    const test1 = await User.aggregate([
      { $unwind: "$rooms" },

      { $unwind: "$rooms.schedule" },

      {
        $match: {
          _id: cospaceID,
          type: "coworkingSpace",
          "rooms._id": roomID,
          "rooms.schedule._id": schedID
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
          _id: cospaceID,
          type: "coworkingSpace",
          "rooms._id": roomID,
          "rooms.schedule._id": schedID
        }
      },

      { $project: { date: "$rooms.schedule.Date", _id: 0 } }
    ]);
    const test3 = await User.aggregate([
      { $unwind: "$rooms" },

      { $unwind: "$rooms.schedule" },

      {
        $match: {
          _id: cospaceID,
          type: "coworkingSpace",
          "rooms._id": roomID,
          "rooms.schedule._id": schedID
        }
      },

      { $project: { time: "$rooms.schedule.time", _id: 0 } }
    ]);

    const f = await User.findOneAndUpdate(
      {
        _id: cospaceID
      },

      {
        $set: {
          "rooms.$[i].schedule.$[j].reserved": true,
          "rooms.$[i].schedule.$[j].reservedBy": {
            uid: req.params.userID
          }
        }
      },

      {
        arrayFilters: [{ "i._id": roomID }, { "j._id": schedID }]
      }
    );

    const test0 = await User.aggregate([
      { $unwind: "$rooms" },

      { $unwind: "$rooms.schedule" },

      {
        $match: {
          _id: cospaceID,
          type: "coworkingSpace",
          "rooms._id": roomID,
          "rooms.schedule._id": schedID
        }
      },

      { $project: { reserved: "$rooms.schedule.reserved", _id: 0 } }
    ]);

    const coName = await User.find({
      type: "coworkingSpace",
      _id: cospaceID
    });

    const rName = await User.aggregate([
      { $unwind: "$rooms" },

      { $unwind: "$rooms.schedule" },

      {
        $match: {
          _id: cospaceID,
          type: "coworkingSpace",
          "rooms._id": roomID,
          "rooms.schedule._id": schedID
        }
      },

      { $project: { rNO: "$rooms.roomNumber", _id: 0 } }
    ]);

    await User.findOneAndUpdate(
      { _id: req.params.userID },

      {
        $addToSet: {
          RoomsBooked: {
            bookingID: new objectid(),
            coworkingSpaceID: cospaceID,
            coworkingSpaceName: coName.pop().name,
            roomName: "Room" + rName.pop().rNO,
            roomID: roomID,

            scheduleID: schedID,
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
});

//-----------------------delete booking and set the reservation boolean to false so others can now book it------------------------//
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
            _id: ObjectId(authorizedData.id),
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
            _id: ObjectId(authorizedData.id),
            "RoomsBooked.bookingID": objectid(req.params.bookingID)
          }
        },
        { $project: { cospaceID: "$RoomsBooked.coworkingSpaceID", _id: 0 } }
      ]);
      const test2 = await User.aggregate([
        { $unwind: "$RoomsBooked" },
        {
          $match: {
            _id: ObjectId(authorizedData.id),
            "RoomsBooked.bookingID": objectid(req.params.bookingID)
          }
        },
        { $project: { roomid: "$RoomsBooked.roomID", _id: 0 } }
      ]);
      const test3 = await User.aggregate([
        { $unwind: "$RoomsBooked" },
        {
          $match: {
            _id: ObjectId(authorizedData.id),
            "RoomsBooked.bookingID": objectid(req.params.bookingID)
          }
        },
        { $project: { scheduID: "$RoomsBooked.scheduleID", _id: 0 } }
      ]);

      const f = await User.findOneAndUpdate(
        {
          _id: test1.pop().cospaceID
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
        { _id: ObjectId(authorizedData.id) },
        {
          $pull: { RoomsBooked: { bookingID: objectid(req.params.bookingID) } }
        },
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
//------------------------------------------------------------------------------------------

// Get all Members (Malak&Nour) MONGOUPDATED
router.get("/", async (req, res) => {
  // Members.find()
  // .then(items=>res.json(items))
  const r = await User.find({ type: "member" });
  res.json(r);
});
//Get profile
router.get("/viewMember", (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      try {
        const member = await User.findOne({
          type: "member",
          _id: authorizedData.id
        });
        if (member === undefined || member.length == 0)
          return res.json("Member does not exist");
        res.json(member);
      } catch (error) {
        res.json(error.message);
      }
      console.log("SUCCESS: Connected to protected route y");
    }
  });
});
//Get specific member -Mariam
router.get("/viewMember/:id", async (req, res) => {
  try {
    const member = await User.findOne({
      type: "member",
      userID: parseInt(req.params.id)
    });
    if (member === undefined || member.length == 0)
      return res.json("Member does not exist");
    res.json(member);
  } catch (error) {
    res.json(error.message);
  }
});

//------------------------get all approved tasks------------------------------//
router.get("/allTasks", async (req, res) => {
  //const member = await  User.find({type:"member"})
  const partner = await User.find({ type: "partner" });
  var tasks = [];
  for (var i = 0; i < partner.length; i++) {
    for (var j = 0; j < partner[i].tasks.length; j++) {
      if (partner[i].tasks[j].approved === true)
        tasks.push(partner[i].tasks[j]);
    }
  }
  res.json(tasks);
});

// Update member (Malak&Nour) done except id non existent case
router.put("/:id", async (req, res) => {
  try {
    var max32 = Math.pow(2, 32) - 1;
    var ID = Math.floor(Math.random() * max32);
    const id = req.params.id;
    const upd = Object.assign({ _id: ID }, req.body);

    console.log(upd);
    users
      .update({ _id: id }, { $push: { updates: upd } })
      .then(res.json({ msg: "awaiting admin approval" }))
      .catch(res.json({ msg: "error occured" }));
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

// Delete Member (Malak&Nour) MONGOUPDATED
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMember = await Members.findByIdAndRemove(id);
    res.json({ msg: "Member was deleted successfully", data: deletedMember });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

//---------------------------- member view his tasks------------------------//
router.get("/view/:id", async (req, response) => {
  var data = "";
  const memID = parseInt(req.params.id);
  const member = await User.findOne({ type: "member", userID: memID });
  console.log(member);
  if (member === null) {
    response.send("the databsae has no member with the given ID");
  } else {
    // Object is NOT empty
    data = member.memberTasks;
    response.send(data);
  }
});
router.put("/ApplyForTask/:idp/:idt", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      const memID = authorizedData.id;
      const partnerID = objectid(req.params.idp);
      const partner = await User.findOne(partnerID);
      const taskIDb = parseInt(req.params.idt);
      var taskapp = {};
      var applicantsapp = [];
      var array_of_tasks = partner.tasks;

      for (var i = 0; i < array_of_tasks.length; i++) {
        if (
          array_of_tasks[i].taskID === taskIDb &&
          array_of_tasks[i].approved === true
        )
          taskapp = array_of_tasks[i]; //you have a task that is approved with this given id
      }
      applicantsapp = taskapp.applicants;
      //console.log(taskapp);
      var app = [];

      for (var j = 0; j < applicantsapp.length; j++) {
        if (
          applicantsapp[j].accepted === true &&
          applicantsapp[j].assigned === true &&
          applicantsapp[j].applicantID !== memID
        ) {
          app.push(applicantsapp[j]);
        }
      }

      if (app.length === 0) {
        applicantsapp.push({
          applicantID: memID,
          accepted: false,
          assigned: false
        });

        User.update(
          { _id: partnerID, "tasks.taskID": taskIDb },
          { $set: { "tasks.$.applicants": applicantsapp } },
          function(err, model) {}
        );

        const partnerx = await User.findOne(partnerID);
        var final;
        for (var i = 0; i < partnerx.tasks.length; i++) {
          if (partnerx.tasks[i].taskID === taskIDb)
            final = partnerx.tasks[i].applicants;
        }
        //console.log(final)
        res.json("applied successful");
      } else
        res.json("you can't apply for a task that already has a chosen member");
    }
  });
});
//---------------------------get the recommended tasks based on my field---------------------//

router.get("/recoTasks/:idM", async (req, res) => {
  const memID = parseInt(req.params.idM);
  const member = await User.findOne({ type: "member", userID: memID });
  const partner = await User.find({ type: "partner" });
  var tasks = [];
  // findOne()

  let data = "";
  for (var i = 0; i < partner.length; i++) {
    for (var j = 0; j < partner[i].tasks.length; j++) {
      if (
        partner[i].tasks[j].field === member.field &&
        partner[i].tasks[j].approved === true
      ) {
        tasks.push(partner[i].tasks[j]);
        /*console.log(partner[i].tasks[j].field)
             console.log(partner[i].tasks[j].taskID)
             console.log(partner[i].tasks[j].name)
             console.log(partner[i].tasks[j].description)
             console.log(partner[i].userID)*/

        data += `<a href="/api/member/memID/${partner[i].tasks[j].taskID}">${
          partner[i].tasks[j].name
        }<br> ${partner[i].tasks[j].description}<br>${partner[i].name}</a><br>`;

        console.log(data);
      }
    }
  }

  res.send(data);
});
//------------------------------- member gets his average rating  -----------------------------------//

router.get("/MyRating/", async (req, response) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      response.sendStatus(403);
    } else {
      const MID = authorizedData.id;
      const member = await User.findOne({ type: "member", _id: MID });
      const AllMyRatings = member.allRatings;
      const Rlength = AllMyRatings.length;
      var sum = 0;
      var avg = 0;

      if (Rlength !== 0) {
        sum = AllMyRatings.reduce(function(sum, b) {
          return sum + b;
        });
        //console.log(sum)
        avg = Math.floor(sum / Rlength);
        // console.log(avg)
        response.json(avg);

        res.json(member);
      } else response.json(0);

      console.log("SUCCESS: Connected to protected route y");
    }
  });
});

router.get("/viewMyTasks", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      response.sendStatus(403);
    } else {
      const id = authorizedData.id;
      // const id  = req.params.id;
      const member = await User.findOne({ type: "member", _id: objectid(id) });
      const myTasks = member.memberTasks;
      res.json(myTasks);
    }

    console.log("SUCCESS: Connected to protected route y");
  });
});
//----------------------Start task-----------------------------------------//
router.put("/startMyTask/:taskID", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      response.sendStatus(403);
    } else {
      const id = authorizedData.id;
      const taskID = objectid(req.params.taskID);
      // const pid = objectid(req.params.id)
      const member = await User.findOne({
        type: "partner",
        _id: objectid(pid)
      });

      const updatedpartner = await User.findOneAndUpdate(
        { _id: pid },
        {
          $set: {
            "tasks.$[i].lifeCycle.2": true
          }
        },
        { arrayFilters: [{ "i._id": taskID }] }
      );
      //res.json(updatedpartner)
    }

    console.log("SUCCESS: Connected to protected route y");
  });
});

//----------------------End task-----------------------------------------//
router.put("/endMyTask/:taskID", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      response.sendStatus(403);
    } else {
      const id = authorizedData.id;
      const taskID = objectid(req.params.taskID);
      //const pid = objectid(req.params.id)
      const member = await User.findOne({
        type: "partner",
        _id: objectid(pid)
      });

      const updatedpartner = await User.findOneAndUpdate(
        { _id: pid },
        {
          $set: {
            "tasks.$[i].lifeCycle.3": true
          }
        },
        { arrayFilters: [{ "i._id": taskID }] }
      );
      //res.json(updatedpartner)
    }

    console.log("SUCCESS: Connected to protected route y");
  });
});
//----------------------Get my tasks-----------------------------------------//

router.get("/getUserData", (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      //res.json({ error: "forbidden", status: "403" });
      res.sendStatus(403);
    } else {
      res.send(authorizedData);
    }
  });
});

module.exports = router;
