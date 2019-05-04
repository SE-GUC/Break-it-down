//--------------------express--------------------
const express = require('express');
const router = express.Router();

//--------------------models--------------------
const users = require('../../models/UserProfile');
const ConsultancyAgency = require('../../models/consultancyAgency');
const Message = require('../../models/messages');
const recommendedAppl = require('../../models/RecommendedApplicants');


//-------------------pathToSendFile----------------------------
var path = require('path');

var objectid = require('mongodb').ObjectID


//auth
const jwt = require("jsonwebtoken");

const tokenKey = require("../../config/keys").secretOrKey;

var store = require("store");

//------------------------------push notifications---------------------------
var CronJob = require('cron').CronJob;
const cron = require("cron");
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


//==================================================================================================================

//-----------------------chat-----------------------------

router.get('/chat',function(req,res){
    res.sendFile(path.resolve('./indexx.html'));
	});
	
	//----------------------------------view messages---------------------------------- 
router.get('/viewmessages', async (req, res) => {
    const updt=await Message.find()
    res.json({ data: updt })
})
//---Get my partner----// Malak
router.get('/Partners/:_id', async (req, res) => {

	//the id is currently hardcoded with postman, it is my own id and should be taken from the token
	try{
		users.findById(req.params._id)
		.then(myca =>{
			res.json({partners:myca.partners})})
	
	}
	catch{
		res.json({msg:"yuf"})
	}
	
	})
	//----------------viewTasks----------------
router.get('/viewTasks/:_id', async (req, res) =>{
	try{
		users.findById(req.params._id)
		.then(partner =>
			res.json({tasks:partner.tasks}))
	}
	catch{
		res.json({msg:"error"})
	}
})

//-----------------------------------------Mariam-------------------------------------------------------------------
//--------------Filter applicants-----------------------------
router.put("/filterApplicants/:partnerID/:taskID/:consultID", async (req, res) => {
  try {

    //Partner tasks
    const tasks = await users.aggregate([
      { $unwind: "$tasks" },
      {
        $match: {
          _id: objectid(req.params.partnerID),
          "tasks._id": objectid(req.params.taskID)
        }
      },
      { $project: { tasks: 1, _id: 0 } }
		]);
		if((tasks[0].tasks.consultancyAssignedID	== req.params.consultID)===false)
		  return res.json("You are not assigned to this task.")
    if (tasks[0].tasks.approved === false)
      return res.json("Task is not approved yet. Please tune in for approval.");

    if (tasks[0].tasks.lifeCycle[1] === true)
      return res.json("An applicant is already assigned to this task.");
    if (tasks[0].tasks.wantsConsultant === false)
      return res.json(
        "A demand for a consultancy agency is not required by this task."
      );

    var matchingSkills = 0;

    var toCompare = [];
    const applicants = tasks[0].tasks.applicants;
    //return res.json(applicants)
    for (var i = 0; i < applicants.length; i++) {
      const applicantID = applicants[i].applicantID;
      const member = await User.findOne({ _id: objectid(applicantID) });
      matchingSkills = _.intersection(member.skills, tasks[0].tasks.skills)
        .length;
      if (member.field === tasks[0].tasks.field) matchingSkills++;
      toCompare.push({
        applicant: member,
        matchingSkills: matchingSkills,
        applicantID: applicantID
      });
    }
    const max = toCompare.reduce((prev, current) =>
      prev.matchingSkills > current.matchingSkills ? prev : current
    );

    await users.findOneAndUpdate(
      { _id: objectid(req.params.partnerID) },
      {
        $set: {
          "tasks.$[i].applicants.$[j].accepted": true,
          "tasks.$[i].applicants.$[j].assigned": true,
          "tasks.$[i].lifeCycle.1":true
        }
      },
      {
        arrayFilters: [
          { "i._id": objectid(req.params.taskID) },
          { "j.applicantID": objectid(max.applicantID) }
        ]
      }
    );
    return res.json(max.applicant);
  } catch (error) {
    res.json(error.message);
  }
});



//----------------------------------------------------------------------------------------------------------------------------

//------------look for a particular coworking space-----------
var objectid = require('mongodb').ObjectID
router.get('/PartnerCoworkingspaces/:id',async (req,res) =>{

const Users =await users.find({type:'coworkingspace',userID:parseInt(req.params.id)})
if(!Users) return res.json('Coworking space does not exist')
res.json({ data: Users });
}); 

//------------------view all coworking spaces---------------
router.get('/PartnerCoworkingspaces',async (req, res) =>{
const Users = await users.find({type:'coworkingspace'})
	res.json({ data: Users })
});

router.post('/messages', async (req, res) => {

	try{

				var message = new Message(req.body);
				console.log(req.body);
		var savedMessage = await message.save();

			console.log('saved');

			res.sendStatus(200);

	}	
	catch (error){

		res.sendStatus(500);

		return console.log('error',error);

	}	
})

//--------------get all consultancy agencies-----------
router.get('/', async (req,res) => {
// const ConsultancyAgencys = await ConsultancyAgency.find()
// res.json( ConsultancyAgencys)
jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
  if (err) {
    //If error send Forbidden (403)
    console.log("ERROR: Could not connect to the protected route");
    //res.json({ error: "forbidden", status: "403" });
    res.sendStatus(403);
  } else {
    try {
      const CA = await users.findOne({
        _id: authorizedData.id
      });
      if (CA === undefined || CA.length == 0)
        return res.json("Member does not exist");
      res.json(CA);
    } catch (error) {
      res.json(error.message);
    }
    console.log("SUCCESS: Connected to protected route y");
  }
});
})


//--------------------------------nourhan----------------------------------------------

//--------------apply for a task-----------
router.put("/apply/:pid/:tid/:agid", async (req, res) => {
  const tid = objectid(req.params.tid);
  const aid = objectid(req.params.agid);
  const tmp = await users.findOneAndUpdate(
    { "_id": objectid(req.params.pid), "tasks._id": tid },
    {
      $addToSet: {
        "tasks.$.consultancies": { agencyID: aid, accepted: false, assigned: false }
      }
    }
  );
  res.send("applied successfully");
});

//---------------------Get all bookings of a specific user----------------------------// done with front

router.get("/roombookings/:userID", async (req, res) => {
  var userID = (req.params.userID);

  const roombookings = await users.find(
    { _id: userID },
    { RoomsBooked: 1, _id: 0 }
  );

  res.json( roombookings.pop().RoomsBooked );
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
      { "_id": (req.params.userID) },

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
});


//-----------------------delete booking and set the reservation boolean to false so others can now book it------------------------//
router.delete("/RoomBookings/:userID/:bookingID", async (req, res) => {
  // try{
  const test = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": objectid(req.params.userID),
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
        "_id": objectid(req.params.userID),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { cospaceID: "$RoomsBooked.coworkingSpaceID", _id: 0 } }
  ]);
  const test2 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": objectid(req.params.userID),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { roomid: "$RoomsBooked.roomID", _id: 0 } }
  ]);
  const test3 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": objectid(req.params.userID),
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
    { "_id": (req.params.userID) },
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
 
 



//-----------------------------------------------------------------------------------------------


//--------------get specific consultancy agencies-----------
router.get('/:id', (req, res) => {

	users.findById(req.params.id)
	.then( ca =>{
		res.json(ca)
	}
	)
}
)

//------------------Update consultancyAgency (Malak&Nour)--------------
router.put('/:id', async (req,res) => {
	try {
		var max32 = Math.pow(2, 32) - 1
	var ID = Math.floor(Math.random() * max32);
		const id = req.params.id
		const upd=Object.assign({_id:ID}, req.body);
	
		console.log(upd)
		users.update( 
			{'_id':id},
			{$push: {'updates':upd}}) 
			.then(res.json({msg: 'awaiting admin approval'}))
			.catch(res.json({msg: 'error occured'}))
	
	
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
	})



//---------------Delete consultancyAgency (Malak&Nour) MONGOUPDATED----------------
router.delete('/:id', async (req,res) => {
try {
	const id = req.params.id
	const deletedConsultancyAgency = await ConsultancyAgency.findByIdAndRemove(id)
	res.json({msg:'ConsultancyAgency was deleted successfully', data: deletedConsultancyAgency})
}
catch(error) {
		// We will be handling the error later
		console.log(error)
}  
})



//------------delete booking from user array + change reserved to false in coworking space array----------
router.delete('/RoomBookings/:userID/:bookingID', async (req,res) => {

try {
	const userID=parseInt(req.params.userID);
	const bookingID= parseInt(req.params.bookingID);
	
			const temp = await users.find({userID});
			if(!temp[0])res.send('user id does not exist');
	const book = temp[0].RoomsBooked;
	const temp2 =await book.find(r => r.bookingID === bookingID);
	if(!temp2){

			res.status(404).send('The booking with the given id is not found');

			return;

	};
	const roomID=parseInt(temp2.roomID);
	const scheduleID=parseInt(temp2.scheduleID);
	const coworkingSpaceID=parseInt(temp2.coworkingSpaceID);
	//res.send(roomID+" "+scheduleID+""+coworkingSpaceID);
	//,'rooms.id':roomID,'rooms.schedule.id':scheduleID
	//'rooms.$.schedule.reserved':false
	users.update({'type':'coworkingspace','userID':coworkingSpaceID,'rooms.id':roomID,'rooms.schedule.id':scheduleID}, 
	{$set: {'rooms.$.schedule.reserved':false}}, function(err, model){});
	
	users.updateOne( {userID}, { $pull: { RoomsBooked: {bookingID:bookingID} }
	}, function(err, model){})
	
	
	res.send('booking has been deleted successfully')
}

catch(error) {
		console.log(error)

}  

});

//----------------assign managerial roles to tasks----------------

router.put('/assign/:partnerID/:taskID/:memberID', async (req,res) => {

try {

	const partnerID=parseInt(req.params.partnerID)

	const taskID=parseInt(req.params.taskID)

	const memberID=parseInt(req.params.memberID)

	const partner = await users.find({userID:partnerID});

	if(!partner) res.send("Partner id is incorrect or this partner does not exist ")

	//res.send(partner[0].tasks)
	const taskArray= partner[0].tasks;
	
	const task=await taskArray.find(r => r.taskID === taskID)

	if(!task) res.send("This task does not exist");

	if(!task.wantsConsultant) res.send("You don't have access to this task")

	//set assigneeID to inserted member ID
	users.update({ 'userID':partnerID,'tasks.taskID':taskID}, 
	{$set: {'tasks.$.assigneeID':memberID}}, function(err, model){});

	//set life cycle 'assigned' stage to true
	users.update({ 'userID':partnerID,'tasks.taskID':taskID}, 
	{$set: {'tasks.$.lifeCycle.1':true}}, function(err, model){});
	
	res.send('Member has been assigned to task successfully')

}

catch(error) {

		// We will be handling the error later

		console.log(error)

}  

});




module.exports = router;
