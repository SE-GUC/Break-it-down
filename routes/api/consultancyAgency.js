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
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys").secretOrKey;
var store = require("store");


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

//-----------------------chat-----------------------------

router.get('/chat',function(req,res){
    jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        res.sendFile(path.resolve('./indexx.html'));
      }
    });
  });

	
	//----------------------------------view messages---------------------------------- 
router.get('/viewmessages', async (req, res) => {
    jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        const updt=await Message.find()
        res.json({ data: updt })
      }
  });
   
})
//// VIEW TASKS AVAILABLE FOR APPLICATION malak
router.get("/allTasks", async (req, res) => {
  //const member = await  User.find({type:"member"})
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const partner = await User.find({ type: "partner" });
      var tasks = [];
      for (var i = 0; i < partner.length; i++) {
        for (var j = 0; j < partner[i].tasks.length; j++) {
          if (partner[i].tasks[j].approved === true&&partner[i].tasks[j].wantsConsultant === true && 
            !partner[i].tasks[j].consultancyAssignedID && (
            (partner[i].tasks[j].consultancies&&!partner[i].tasks[j].consultancies.some(consult=> consult.consultancyID===authorizedData.id))||!partner[i].tasks[j].consultancies)){
            const taskok={...(partner[i].tasks[j]), pid:partner[i]._id, pname:partner[i].name,taskID:partner[i].tasks[j].taskID}
            tasks.push(taskok);
            console.log(partner[i].tasks[j])
    
          }
        }
      }
      res.json(tasks);    }
  });
});
 

//---Get my partner----// Malak
router.get('/Partners', async (req, res) => {

  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {  
      	try{
		users.findById(authorizedData.id)
		.then(myca =>{
			res.json({partners:myca.partners})})
	
	}
	catch{
		res.json({msg:"yuf"})
	}
	
    }
  });

	})
	//----------------viewTasks---------------- of a certain partner Nour
router.get('/viewTasks/:_id', async (req, res) =>{
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {	try{
		users.findById(req.params._id)
		.then(partner =>
			res.json({tasks:partner.tasks}))
	}
	catch{
		res.json({msg:"error"})
	}
     //put code here
    }
  });
});



//-----------------------------------------Mariam-------------------------------------------------------------------
//--------------Filter applicants-----------------------------
router.put("/filterApplicants/:partnerID/:taskID/", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
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
		if((tasks[0].tasks.consultancyAssignedID	== authorizedData.id)===false)
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
  }//put code here
    }
  });
});
  




//----------------------------------------------------------------------------------------------------------------------------

//------------look for a particular coworking space-----------
var objectid = require('mongodb').ObjectID
router.get('/PartnerCoworkingspaces/:id',async (req,res) =>{
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {const Users =await users.find({type:'coworkingspace',userID:parseInt(req.params.id)})
if(!Users) return res.json('Coworking space does not exist')
res.json({ data: Users });
     //put code here
    }
  });
});



//------------------view all coworking spaces---------------
router.get('/PartnerCoworkingspaces',async (req, res) =>{
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
  
      const Users = await users.find({type:'coworkingspace'})
      res.json({ data: Users })    }
  });
});



//--- MESSAGES

router.post('/messages', async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {	try{

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
    }
  });
});



//--------------get all consultancy agencies-----------

router.get('/All', async (req,res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
     const ConsultancyAgencys = await ConsultancyAgency.find()
      res.json({data: ConsultancyAgencys})
    }
  });
});




//--------------------------------nourhan----------------------------------------------

//--------------apply for a task-----------
router.put("/apply/:pid/:tid/", async (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
       const tid = parseInt(req.params.tid);

  const tmp = await users.findOneAndUpdate(
    { "_id": objectid(req.params.pid), "tasks.taskID": tid },
    {
      $addToSet: {
        "tasks.$.consultancies": { consultancyID: authorizedData.id, accepted: false, assigned: false }
      }
    }
  );
  res.send("applied successfully");
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
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
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
    }
  });
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
            uid: (authorizedData.id)
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
}});
    
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
        "_id": objectid(authorizedData.id),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { cospaceID: "$RoomsBooked.coworkingSpaceID", _id: 0 } }
  ]);
  const test2 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": objectid(authorizedData.id),
        "RoomsBooked.bookingID": objectid(req.params.bookingID)
      }
    },
    { $project: { roomid: "$RoomsBooked.roomID", _id: 0 } }
  ]);
  const test3 = await User.aggregate([
    { $unwind: "$RoomsBooked" },
    {
      $match: {
        "_id": objectid(authorizedData.id),
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
    { "_id": (authorizedData.id) },
    { $pull: { RoomsBooked: { bookingID: objectid(req.params.bookingID) } } },
    { multi: true },
    async function(err, model) {
      if (err) return handleError(res, err);
      else {
        res.json({ data: "reservation was deleted successfully" });
      }
    }
  );
}}
);    }
)
  
 
 



//-----------------------------------------------------------------------------------------------


//--------------get specific me asconsultancy agencies-----------

router.get('/', (req, res) => {
    jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {

      users.findById(authorizedData.id)
      .then( ca =>{
        res.json(ca)
      }    )
    }
  });
});

//--------------get specific consultancy agencies-----------

router.get('/:_id', (req, res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
  if (err) {
    //If error send Forbidden (403)
    console.log("ERROR: Could not connect to the protected route");
    res.sendStatus(403);
  } else {

    users.findById(req.params._id)
    .then( ca =>{
      res.json(ca)
    }    )
  }
});
});



//------------------Update consultancyAgency (Malak&Nour)--------------
router.put('/', async (req,res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      try {
        var max32 = Math.pow(2, 32) - 1
      var ID = Math.floor(Math.random() * max32);
        const id = authorizedData.id
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
      }     }
  });
});
	 




//---------------Delete consultancyAgency (Malak&Nour) MONGOUPDATED----------------
router.delete('/', async (req,res) => {
    jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
      if (err) {
        //If error send Forbidden (403)
        console.log("ERROR: Could not connect to the protected route");
        res.sendStatus(403);
      } else {
        try {
          const id = req.params.id
          const deletedConsultancyAgency = await ConsultancyAgency.findByIdAndRemove(id)
          res.json({msg:'ConsultancyAgency was deleted successfully', data: deletedConsultancyAgency})
        }
        catch(error) {
            // We will be handling the error later
            console.log(error)
        }      }
    });
  });
  




//------------delete booking from user array + change reserved to false in coworking space array----------
router.delete('/RoomBookings/:bookingID', async (req,res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    }
     else {
      try {
        const userID=parseInt(authorizedData.id);
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
      
      } 
    });    }
  );



//----------------assign managerial roles to tasks----------------

router.put('/assign/:partnerID/:taskID/:memberID', async (req,res) => {
  jwt.verify(store.get("token"), tokenKey, async (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
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
      
      }}
      )   }
);





module.exports = router;
