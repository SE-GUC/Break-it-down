// ---------------express-------------
const express = require('express');
const router = express.Router();

var objectid = require('mongodb').ObjectID
const jwt = require("jsonwebtoken");
var store = require("store");
const tokenKey = require("../../config/keys").secretOrKey;
const users = require("../../models/UserProfile");

//-------------------Models-------------------
const EducationalOrganisation = require('../../models/EducationalOrganization');


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


// Get all EducationalOrganisations MONGOUPDATED
router.get('/', async (req,res) => {
	const educationalOrganisation = await EducationalOrganisation.find()
	res.json({data: educationalOrganisation})
})

//Get Specific EducationalOrganisation MONGOUPDATED
router.get('/:id', (req, res) => {
  EducationalOrganisation.findById(req.params.id)
		.then(educationalOrganisation=> res.json(educationalOrganisation))
		.catch(err=>res.status(404).json({ msg: 'No EducationalOrganisation with the id of ${req.params.id}'}))
});

// Create a new EducationalOrganisation (Malak&Nour) MONGOUPDATED
router.post('/', async(req, res) => {
	const {type,name,email ,address ,phoneNumber ,description,trainers,trainingPrograms,certificates }=req.body
	const educationalOrganisation = await EducationalOrganisation.findOne({email})
	if(educationalOrganisation) return res.status(400).json({error: 'Email already exists'})
	
		const newEducationalOrganisation = new EducationalOrganisation({
			name,
			email,
			type,
			phoneNumber,
			address,
			description,
			trainers,
			trainingPrograms,
			certificates
		})
		newEducationalOrganisation
		.save()
		.then(educationalOrganisation => res.json({data :educationalOrganisation}))
			.catch(err => res.json({error: 'Can not create EducationalOrganisation'}))
	 //catch (error){
	//console.log("can not create")}
	});

// Update EducationalOrganisation (Malak&Nour) done except id non existent case
router.put('/:id', async (req,res) => {
	try {
	 const id = req.params.id
     const educationalOrganisation = await EducationalOrganisation.findOne({id})
    // if(!educationalOrganisation) return res.status(404).send({error: 'EducationalOrganisation does not exist'})
	// const isValidated = validator.updateValidation(req.body)
	 //if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     
     const updatedEducationalOrganisation = await EducationalOrganisation.updateOne(req.body)

	 res.json({msg: 'EducationalOrganisation updated successfully'})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})


// Delete EducationalOrganisation (Malak&Nour) MONGOUPDATED
router.delete('/:id', async (req,res) => {
	try {
	 const id = req.params.id
	 const deletedEducationalOrganisation = await EducationalOrganisation.findByIdAndRemove(id)
	 res.json({msg:'EducationalOrganisation was deleted successfully', data: deletedEducationalOrganisation})
	}
	catch(error) {
			// We will be handling the error later
			console.log(error)
	}  
})
  
//JOI later

/*
router.post('/joi', (req, res) => {
	const name = req.body.name
	const website = req.body.website

	const schema = {
		name: Joi.string().min(3).required(),
		website: Joi.number().required(),
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].messwebsite });

	const newEducationalOrganisation = {
		name,
		website,
		id: uuid.v4(),
	};
	return res.json({ data: newEducationalOrganisation });
});*/

//shaza
//get the coworking space by id
router.get('/api/PartnerCoworkingspaces/:id',(req,res)=>{
	const PartnerCoworkingspaces=PartnerCoworkingSpace.find(c=>c.id===parseInt(req.params.id));
	if(!PartnerCoworkingspaces) return res.status(404).send('coworkingspace not found');
	res.send(PartnerCoworkingspaces);
});

//view all coworking spaces
router.get('/api/PartnerCoworkingspaces',(req,res)=>{
	res.send(PartnerCoworkingSpace);
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

module.exports = router;
