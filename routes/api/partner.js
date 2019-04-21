const express = require("express");
const router = express.Router();
const Joi = require("joi");

const partner = require("../../models/Partner");
const users = require("../../models/UserProfile");
var Mongoose = require("mongoose");
var ObjectId = Mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys").secretOrKey;
var store = require("store");

const cron = require("cron");
const notifier = require("node-notifier");

const job = cron.job("*/100 * * * * *", () =>
  // console.log('helloo'),
  //   getUsers(),
  sendNotification("5c9114781c9d440000a926ce")
);
//job.start();

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

//nourhan -------------------------------------------------------------------------------------------------------------------
const message = require("../../models/messages");
var objectid = require("mongodb").ObjectID;

//-------------------pathToSendFile----------------------------
var path = require("path");

var objectid = require("mongodb").ObjectID;

//-----------------------chat-----------------------------

router.get("/chat", function(req, res) {
  res.sendFile(path.resolve("./indexx.html"));
});

//----------------------------------view messages----------------------------------
router.get("/viewmessages", async (req, res) => {
  const updt = await message.find();
  res.json({ data: updt });
});
//-----------------------------------partner submit task description-------------------------------------------//  done with id, done react

router.post("/createTask/:PID", async (req, res) => {
  const name = req.body.name;
  const ownerID = ObjectId(req.params.PID);
  //const pid = ObjectId(req.params.PID);
  const description = req.body.description;
  const wantsConsultant = req.body.wantsConsultant;
  const field = req.body.field;
  //const skills=req.body.skills;
  const applicants = [];
  const approved = false;
  const lifeCycle = [false, false, false, false];
  const partner = await users.findOne(ownerID);
  if (partner === null) {
    res.json("the partner id is not correct");
  } else {
    const taskID = partner.tasks.length;
    const schema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      wantsConsultant: Joi.boolean().required(),
      field: Joi.string().required()
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

    users.updateOne({ _id: ownerID }, { $set: { tasks: t.tasks } }, function(
      err,
      model
    ) {});
    return res.json(newtask);
  }
});

//--------------------------Partner view task's applicants -----------------------------------//  done with id ,done react
router.get("/view/:PID/:TID", async (req, res) => {
  const partnerID = ObjectId(req.params.PID);
  const taskIDb = parseInt(req.params.TID);
  const partner = await users.findOne(partnerID);
  var task2 = {};
  if (partner === null) {
    res.json("the partner id is not correct");
  } else {
    var task = partner.tasks;
    var t = task.find(task => task.taskID === taskIDb);

    if (t === null) {
      res.json("the task Id is not correct");
    } else {
      res.send(t.applicants);
    }
  }
});
//-------------------------choose and send the applicant to the admin to assign-------------------------//  done with id

router.put("/AcceptApplicant/:idP/:idT", async (req, res) => {
  var flag = false;
  const PartID = req.params.idP;
  const Task_id = parseInt(req.params.idT);

  const partner = await users.findOne({ _id: PartID });
  if (partner === null) {
    res.json("the partner id is not correct");
  } else {
    const task = partner.tasks;

    const t = task.find(task => task.taskID === Task_id);

    if (t === null) {
      res.json("the task Id is not correct");
    } else {
      const applicantID = req.body.applicantID;
      const schema = {
        applicantID: Joi.string().required() //the member needs to pass his object id in the applicantID and not his user id
        //applicantID:Joi.number().required()
      };

      const result = Joi.validate(req.body, schema);

      if (result.error) return res.status(400).send(error.message);
      else {
        for (var i = 0; i < t.applicants.length; i++) {
          if (t.applicants[i].accepted === true) flag = true;
        }
        if (flag === false) {
          const f = await users.findOneAndUpdate(
            { _id: PartID },
            {
              $set: {
                "tasks.$[i].applicants.$[j].accepted": true
              }
            },

            {
              arrayFilters: [
                { "i.taskID": Task_id },
                { "j.applicantID": ObjectID(applicantID) }
              ]
            }
          );

          res.json("done");
        } else {
          res.json("there exists an accepted applicant for the task");
        }
      }
    }
  }
});

//-------------------------------partner review tasks and rate member assigned -----------------------------------// done with id,done with react,handle applicant object id

router.put("/ReviewandRate/:PID/:TID", async (req, res) => {
  const partnerID = ObjectId(req.params.PID);
  const partner = await users.findOne(partnerID);

  const taskID = parseInt(req.params.TID);

  if (partner === null) {
    res.json("the partner id is not correct");
  } else {
    var task = partner.tasks;

    const t = task.find(task => task.taskID === taskID);

    if (t === null) {
      res.json("the task Id is not correct");
    } else {
      for (var i = 0; i < partner.tasks.length; i++) {
        if (partner.tasks[i].taskID === taskID) task = partner.tasks[i];
      }

      // console.log(task.lifeCycle[3])
      const rate = req.body.rating;
      const review = req.body.review;

      const schema = {
        rating: Joi.number()
          .min(0)
          .max(5)
          .required(),
        review: Joi.string().required()
      };

      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.send(result.error.details[0].message);
      } else {
        const taskDone = task.lifeCycle[3];

        if (taskDone === true) {
          task.rate = rate;
          task.review = review;

          const assigneeID = task.assigneeID;

          const f = await users.findOneAndUpdate(
            { _id: partnerID },
            {
              $set: {
                "tasks.$[i].review": review,
                "tasks.$[i].rate": parseInt(rate)
              }
            },

            {
              arrayFilters: [{ "i.taskID": taskID }]
            }
          );
          const x = await users.findOneAndUpdate(
            { userID: assigneeID },
            {
              $set: {
                allRatings: rate
              }
            }
          );

          res.json("you're review and rate has been successfully added");
        } else {
          return res.send({ error: "task is not done yet" });
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
  if (partner === null) {
    res.json("the partner id is not correct");
  } else {
    var task = partner.tasks;
    var t = task.find(task => task.taskID === taskIDb);

    if (t === null) {
      res.json("the task Id is not correct");
    } else {
      res.send(t.consultancies);
    }
  }
}); //eman's part starts here

//-----------------------------------partner choose a consultancy agency -------------------------------------------// done with id

router.put("/ChooseConsultancyAgency/:idP/:idT", async (req, res) => {
  var flag = false;
  const PartID = ObjectId(req.params.idP);
  const Task_id = parseInt(req.params.idT);
  const partner = await users.findOne(PartID);

  if (partner === null) res.json("the partner id is not correct");
  else {
    const task = partner.tasks;
    const t = task.find(task => task.taskID === Task_id);

    if (t === null) res, json("the task Id is not correct");
    else {
      const consultancyID = req.body.consultancyID;
      for (var i = 0; i < t.consultancies.length; i++) {
        if (t.consultancies[i].accepted === true) flag = true;
      }

      if (flag === false) {
        const schema = {
          consultancyID: Joi.string().required() //the object id needs to be passed from consultancy
          //consultancyID:Joi.number().required()
        };

        const result = Joi.validate(req.body, schema);

        if (result.error) return res.send(error.message);
        else {
          const f = await users.findOneAndUpdate(
            { _id: PartID },
            {
              $set: {
                "tasks.$[i].consultancies.$[j].accepted": true
              }
            },

            {
              arrayFilters: [
                { "i.taskID": Task_id },
                { "j.consultancyID": ObjectId(consultancyID) }
              ]
            }
          );

          res.json("done");
        }
      }
      if (flag === true) {
        res.json("there exists an accepted applicant for the task");
      }
    }
  }
});
//-----------------------------------partner view a task's life cycle -------------------------------------------// done with id ,done with react

router.get("/TaskLifeCycle/:PID/:TID", async (req, res) => {
  const partnerID = ObjectId(req.params.PID);
  const Task_id = parseInt(req.params.TID);

  const partner = await users.findOne(partnerID);
  const Task_Array = partner.tasks;
  if (partner === null) {
    res.json("the partner id is not correct");
  } else {
    const task = partner.tasks;

    const t = task.find(task => task.taskID === Task_id);

    if (t === null) {
      res.json("the task Id is not correct");
    } else {
      var lifeCyc = [];
      let data = "";
      for (var i = 0; i < Task_Array.length; i++) {
        if (Task_Array[i].taskID === Task_id) {
          lifeCyc = Task_Array[i].lifeCycle;
          data = Task_Array[i].name;
        }
      }

      res.send(lifeCyc);
    }
  }
});

//-----------------------------------partner send request to change description -------------------------------------------// done with id,done with react , need to handle other changes like name

router.put("/RequestDescriptionChange/:PID/:TID", async (req, res) => {
  const PartID = ObjectId(req.params.PID);
  const partner = await users.findOne(PartID);
  const Task_id = parseInt(req.params.TID);
  if (partner === null) {
    res.json("the database has no partner with the given ID");
  } else {
    const task = partner.tasks;
    const task_to_update = task.find(task => task.taskID === Task_id);

    if (task_to_update === null)
      res.json("this partner has no task with the given ID");
    else {
      const changes = req.body.description;

      const schema = {
        name: Joi.string(),
        description: Joi.string(),
        field: Joi.string(),
        skills: Joi.array()
      };

      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.send(result.error.details[0].message);
      } else {
        const newUpdate = {
          id: PartID,
          TaskID: Task_id,
          description: changes,
          status: "pending"
        };
        const updates = partner.updates;
        updates.push(newUpdate);

        const f = await users.findOneAndUpdate(
          { _id: PartID },
          { $set: { updates: updates } }
        );

        const partners = await users.findOne(PartID);
        res.json(partners.updates);
      }
    }
  }
});

//--------------------------------partner view his/her profile------------------------------------------//
router.get("/viewProfile/:PID", async (req, res) => {
  const partnerID = ObjectId(req.params.PID);
  const partner = await users.findOne(partnerID);

  if (partner === null) {
    res.json("the partner id is not correct");
  } else {
    res.json(partner);
  }
});

//-----------------------------------get all tasks for a partner-----------------------------//

router.get("/myTasks/:PID", async (req, res) => {
  const partnerID = ObjectId(req.params.PID);
  const partner = await users.findOne(partnerID);

  if (partner === null) {
    res.json("the partner id is not correct");
  } else {
    res.json(partner.tasks);
  }
});

//---------------------Get all bookings of a specific user----------------------------// done with front

router.get("/roombookings", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      res.sendStatus(403);
    } else {
      var userID = ObjectId(authorizedData.id);

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
          _id: ObjectId(req.params.id),
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
router.delete("/RoomBookings/:userID/:bookingID", async (req, res) => {
  // try{
  const test = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        _id: objectid(req.params.userID),
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
        _id: objectid(req.params.userID),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { cospaceID: "$RoomsBooked.coworkingSpaceID", _id: 0 } }
  ]);
  const test2 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        _id: objectid(req.params.userID),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { roomid: "$RoomsBooked.roomID", _id: 0 } }
  ]);
  const test3 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        _id: objectid(req.params.userID),
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
    { _id: req.params.userID },
    { $pull: { RoomsBooked: { bookingID: objectid(req.params.bookingID) } } },
    { multi: true },
    async function(err, model) {
      if (err) return handleError(res, err);
      else {
        res.json({ data: "reservation was deleted successfully" });
      }
    }
  );
});

module.exports = router;
