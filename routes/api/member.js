// Dependencies
const express = require("express");
const Joi = require("joi");
const uuid = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");
// Models should be removed
const User = require("../../models/UserProfile");
const users = require("../../models/UserProfile");


//nourhan
var objectid = require("mongodb").ObjectID;

var Members = require("../../models/Member");
var partner = require("../../models/Partner");
const PartnerCoworkingSpace = require("../../models/cospaceMTest");
const RoomBookings = require("../../models/RoomBookings");

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

//---------------------------------------------Mariam----------------------------------------------------------
//--------------------filter tasks--------------------
router.get("/filterTasks/:memberID", async (req, res) => {
  try {
    //Member skills: array of strings
    const memberSkills = await users.findOne(
      { type: "member", _id: objectid(req.params.memberID) },
      { skills: 1, _id: 0 }
    );
    //return res.json(memberSkills)
    //Member field
    const memberField = await users.findOne(
      { type: "member", _id: objectid(req.params.memberID) },
      { field: 1, _id: 0 }
    );
    //Resulting tasks
    var recommendedTasks = [];
    //All partner tasks: array of objects & each obj is an array having the tasks (objects) of a certain partner
    const grptasks = await users.find(
      { type: "partner" },
      { tasks: 1, _id: 0 }
    );
    grptasks.forEach(partnerTasks => {
      partnerTasks.tasks.forEach(task => {
        if (
          task.approved === true &&
          task.lifeCycle[1] === false &&
          task.field === memberField.field
        ) {
          if (_.intersection(memberSkills.skills, task.skills).length >= 1)
            recommendedTasks.push(task);
        } else {
          if (_.intersection(memberSkills.skills, task.skills).length >= 3)
            recommendedTasks.push(task);
        }
      });
    });
    res.json(recommendedTasks);
  } catch (error) {
    res.send(error);
  }
});

//==================================================================================================================
// Instead of app use route
// No need to write the full route
// res.json() Automatically sends a status of 200

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

//view all coworking spaces
router.get("/PartnerCoworkingspaces", async (req, res) => {
  const Users = await User.find({ type: "coworkingSpace" });
  res.json(Users);
});

//--------------------------------nourhan----------------------------------------------

// router.get('/',async(req,res)=>{
// 	const m =await User.find({type : "member"});
// 	res.json([{name:"nourhan", age:30},{name:"alia", age:20}])
// })

//---------------------Get all bookings of a specific user----------------------------// done with front

router.get("/roombookings/:userID", async (req, res) => {
  var userID = req.params.userID;

  const roombookings = await users.find(
    { _id: userID },
    { RoomsBooked: 1, _id: 0 }
  );

  res.json(roombookings.pop().RoomsBooked);
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

//------------------------------------------------------------------------------------------

// Get all Members (Malak&Nour) MONGOUPDATED
router.get("/", async (req, res) => {
  // Members.find()
  // .then(items=>res.json(items))
  const r = await User.find({ type: "member" });
  res.json(r);
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

//this method is needed in the new database not the old one
// Create a new member (Malak&Nour) MONGOUPDATED
// router.post('/', async(req, res) => {
// const {type,name, birthday,email ,SSN ,phoneNumber ,field, skills,interests ,jobsCompleted,certificates }=req.body
// const member = await Members.findOne({email})
// if(member) return res.status(400).json({error: 'Email already exists'})

// 	const newMember = new Member({
// 		name,
// 		birthday,
// 		email,
// 		SSN,
// 		phoneNumber,
// 		field,
// 		skills,
// 		interests,
// 		jobsCompleted,
// 		certificates,
// 		MemberTasks:[],
// 		activation:false,
// 	})
// 	newMember
// 	.save()
// 	.then(member => res.json({data :member}))
// 	.catch(err => res.json({error: 'Can not create member'}))
// });

/*router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const book = await Book.findOne({id})
     if(!book) return res.status(404).send({error: 'Book does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedBook = await Book.updateOne(req.body)
     res.json({msg: 'Book updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
*/
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

router.get("/MyRating/:MID", async (req, response) => {
  const MID = parseInt(req.params.MID);
  const member = await User.findOne({ type: "member", userID: MID });
  const AllMyRatings = member.allRatings;
  const Rlength = AllMyRatings.length;
  //console.log(Rlength)
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
  } else response.json(0);
});

//------------------------apply for a task---------------------//

router.put("/ApplyForTask/:id/:idp/:idt", async (req, res) => {
  const memID = parseInt(req.params.id);
  const partnerID = parseInt(req.params.idp);
  const partner = await User.findOne({ type: "partner", userID: partnerID });

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
      { userID: partnerID, "tasks.taskID": taskIDb },
      { $set: { "tasks.$.applicants": applicantsapp } },
      function(err, model) {}
    );

    const partnerx = await User.findOne({ type: "partner", userID: partnerID });
    var final;
    for (var i = 0; i < partnerx.tasks.length; i++) {
      if (partnerx.tasks[i].taskID === taskIDb)
        final = partnerx.tasks[i].applicants;
    }
    //console.log(final)
    res.json(final);
  } else
    res.json("you can't apply for a task that already has a chosen member");
});

//not working since it's only deleting the first booking
//delete booking from user array + change reserved to false in coworking space array
//------------delete booking from user array + change reserved to false in coworking space array----------
// router.delete('/RoomBookings/:userID/:bookingID', async (req,res) => {
// 	try {
// 		const userID=parseInt(req.params.userID);
// 		const bookingID= (req.params.bookingID);

//         const temp = await User.find({userID});
//         if(!temp[0])res.send('user id does not exist');
// 		const book = temp[0].RoomsBooked;
// 		console.log(book);
// 		const temp2 =await book.find(r => r.bookingID === bookingID);
//     if(!temp2){

// 		res.status(404).send('The booking with the given id is not found');
// 		return;
// 	};
// 		const roomID=parseInt(temp2.roomID);
// 		const scheduleID=parseInt(temp2.scheduleID);
// 		const coworkingSpaceID=parseInt(temp2.coworkingSpaceID);
// 		//res.send(roomID+" "+scheduleID+""+coworkingSpaceID);
// 		//,'rooms.id':roomID,'rooms.schedule.id':scheduleID
// 		//'rooms.$.schedule.reserved':false
//     User.update({'type':'coworkingspace','userID':coworkingSpaceID,'rooms.id':roomID,'rooms.schedule.id':scheduleID},
//     {$set: {'rooms.$.schedule.reserved':false}}, function(err, model){});

// 	User.updateOne( {userID}, { $pull: { RoomsBooked: {bookingID:bookingID} } }, function(err, model){})
//     res.send('booking has been deleted successfully')
//     }catch(error) {
// 			console.log(error)
// 		}
// });

module.exports = router;
