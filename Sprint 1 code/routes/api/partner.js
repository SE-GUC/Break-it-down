const express= require('express');
const router= express.Router();
const Joi = require('joi');

const partner = require('../../models/Partner');
const PartnerCoworkingSpace = require('../../models/PartnerCoworkingSpace');
const RoomBookings = require('../../models/RoomBookings');
const User=require('../../models/UserProfile');


const users = require('../../models/UserProfile')

//nourhan -------------------------------------------------------------------------------------------------------------------

var objectid = require('mongodb').ObjectID





//Get all bookings of a specific user

router.get('/roombookings/:userID',async (req, res) => {

  

    var userID = parseInt(req.params.userID);



    await User.find({userID : userID},{RoomsBooked : 1, _id :0},(err, roombookings)=>{



        res.send(roombookings);

    })

  

  })



//get a room in a specific coworking space by id

router.get('/cospace/:id/rooms/:id2' ,async (req, res)=>{

    try{

    const test = await User.aggregate([

        {$unwind: "$rooms"},

        {$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2)}},

         {$project: {schedule:'$rooms.schedule',_id:0}}

    ])

     res.send(test.pop().schedule);

    }

    catch(error){

        res.send("not found")

        console.log("error")

    }

    

});



//book a room , append it to the array of bookings if it is not in my bookings

router.put('/cospace/:id/:userID/rooms/:id2/:id3' ,async(req, res)=>{

    const schedID = req.params.id3;

    const cospaceID = req.params.id;

    const roomID = req.params.id2;



    try{

    const test1 = await User.aggregate([

        {$unwind: "$rooms"},

        {$unwind: "$rooms.schedule"},

        {$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},

        {$project:{reserved:'$rooms.schedule.reserved',_id:0}}

    ])



    //res.send(test1.pop().reserved == "true")

   if(test1.pop().reserved) return res.send({error:'already reserved'})



    const test = await User.aggregate([

        {$unwind: "$rooms"},

        {$unwind: "$rooms.schedule"},

        {$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},

        {$project:{date:'$rooms.schedule.Date',_id:0}}

    ])



    const test3 = await User.aggregate([

        {$unwind: "$rooms"},

        {$unwind: "$rooms.schedule"},

        {$match: {userID:parseInt(req.params.id),type:"coworkingspace",'rooms.id':parseInt(req.params.id2),'rooms.schedule.id':parseInt(schedID)}},

        {$project:{time:'$rooms.schedule.time',_id:0}}

    ])





    const f = await User.findOneAndUpdate({



        'userID' : parseInt(req.params.id)},

    

    {

        $set : {'rooms.$[i].schedule.$[j].reserved' : true, 'rooms.$[i].schedule.$[j].reservedBy' : {uid : parseInt(req.params.userID)}}

    },

    {

        arrayFilters : [{"i.id" : parseInt(roomID)},{"j.id" : parseInt(schedID)}]

    }

    

    )



    await User.findOneAndUpdate({userID : parseInt(req.params.userID)},

    {$addToSet : {RoomsBooked : {bookingID:new objectid(),coworkingSpaceID:parseInt(cospaceID), roomID :parseInt(roomID),

    scheduleID: parseInt(schedID),Date: test.pop().date, time:test3.pop().time}}}, 

    async function(err, model){

               

        if(err)  return handleError(res, err)

        else res.json({msg:'Room was reserved successfully'})

     });

    }

    catch(error){

        console.log(error)

        res.send("Not found")

    }

});



// //delete booking and set the reservation boolean to false so others can now book it

// router.delete('/RoomBookings/:userID/:bookingID',async (req, res) => {

//    // try{

//         const test = await User.aggregate([

//             {$unwind: "$RoomsBooked"},

//             {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},

//             {$project: {'RoomsBooked.bookingID':1,_id:0}}

//         ])





//      if(test==0) return res.send({error:'booking does not exist.'})





//      const test1 = await User.aggregate([

//         {$unwind: "$RoomsBooked"},

//         {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},

//         {$project: {cospaceID:'$RoomsBooked.coworkingSpaceID',_id:0}}

//     ])

//     const test2 = await User.aggregate([

//         {$unwind: "$RoomsBooked"},

//         {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},

//         {$project: {roomid:'$RoomsBooked.roomID',_id:0}}

//     ])

//     const test3 = await User.aggregate([

//         {$unwind: "$RoomsBooked"},

//         {$match: {userID : parseInt(req.params.userID),'RoomsBooked.bookingID':objectid(req.params.bookingID)}},

//         {$project: {scheduID:'$RoomsBooked.scheduleID',_id:0}}

//     ])



    



//     const f =await User.findOneAndUpdate({

//         'userID' : 3},

    

//     {

//         $set : {'rooms.$[i].schedule.$[j].reserved' : false, 'rooms.$[i].schedule.$[j].reservedBy' : {}}

//     },

//     {

//         arrayFilters : [{"i.id" : test2.pop().roomid},{"j.id" : test3.pop().scheduID}]

//     }

    

//     )



//     const y =await User.update(

//         {userID : parseInt(req.params.userID)},

//         {$pull : {RoomsBooked : {bookingID : objectid(req.params.bookingID),}}},{multi : true}, async function(err, model){

               

//             if(err)  return handleError(res, err)

//             else {

                

//                 res.json({msg:'reservation was deleted successfully'})

//         }

//          });

// 	});





//-----------------------------------------------------------------------------------------------------------------


//-----------------------------------partner submit task description-------------------------------------------//

router.post('/createTask', async(req, res)=> {
    const name = req.body.name;
    const ownerID = req.body.ownerID;
    const description= req.body.description;
    const wantsConsultant= req.body.wantsConsultant;
    const applicants= [];
    const approved= false;
    const schema={
       name:Joi.string().required(),
       ownerID:Joi.number().required(),
       
       description:Joi.string().required(),
       wantsConsultant:Joi.boolean().required()
     
    }
    const result=Joi.validate(req.body,schema)
  
    if(result.error)
     return res.status(400).send(error.details[0].message);
 
 
     const newtask = {
         name,
         description,
         wantsConsultant, 
         approved,
         applicants
         
     };
 
     const t = await users.findOne({type:"partner",userID:ownerID} )
    //console.log(t.tasks)
    //t.tasks.push(newtask);
     console.log(t.tasks)
 
    
    users.update({ 'userID':ownerID,'type':'partner'
                   }, 
    {$set: {'tasks':t.tasks}}, function(err, model){}); 
     //return res.json({ data: t.tasks });
     return res.json("your task was created successfully");
 
 
 });
//-------------------------------partner review tasks and rate member assigned -----------------------------------//


router.put('/Review&Rate/:idP/:idT',async(req,res)=>{

    const partnerID = parseInt(req.params.idP)
    const partner = await users.findOne({type:"partner",userID:partnerID})

    const taskID = parseInt(req.params.idT)
    
    for(var i =0;i<partner.tasks.length;i++){
        if(partner.tasks[i].taskID===taskID)
           var task=partner.tasks[i]
    }
    
    console.log(task.lifeCycle[3])
    const rate = req.body.rating
    const review = req.body.review 
   
    const schema = {
        rating: Joi.number().min(0).max(5).required(),
        review: Joi.string().required()
     };
 
    const result = Joi.validate(req.body, schema);

    if(result.error){
        return  res.status(400).send(result.error.details[0].message)
       }

    else {
    const taskDone = task.lifeCycle[3]

    if(taskDone === true){
        task.rate = rate
        task.review = review

        const applicants = task.applicants
        for(var k=0;k<applicants.length;k++){
            if(applicants[k].assigned===true && applicants.accepted===true){
                memberAssigned=applicants[k]
                var app = memberAssigned.applicantID
            }
        }
        
        const mem = await users.findOne({type:"member",userID:app})
     
        //const all = mem.allRatings
        //console.log(mem.allRatings)
        mem.allRatings.push(rate)

        res.json(mem.allRatings)

        users.update({ 'userID':app,'type':'member'}, 
        {$set: {'allRatings':mem.allRatings}}, function(err, model){});

       // users.update({ 'userID':partnerID,'type':'partner'}, 
        //{$set: {:mem.allRatings}}, function(err, model){});

     }
     else {
        return res.status(404).send({error: 'task is not done yet'})
     }

    }

 }); 

//--------------------------Partner view task's applicants -----------------------------------//
router.get('/:idP/:idT',async (req,res)=>{
    const partnerID=parseInt(req.params.idP)
    const taskIDb=parseInt(req.params.idT)
    const partner= await users.find({type:'partner',userID:partnerID})
    let data=""
    var task={}
    for(var i=0;i<partner.length;i++){
        for(var j=0;j<partner[i].tasks.length;j++){
        if(partner[i].tasks[j].taskID===taskIDb)
            task=partner[i].tasks[j].applicants
            data="task id:"+partner[i].tasks[j].taskID +"  "+"task name:"+partner[i].tasks[j].name
    }
    }
    //console.log(task)
   
 
 res.send({data,task}); 
 
 }); 

//-----------------------------------partner send request to change description -------------------------------------------//

router.put('/RequestDescriptionChange/:idP/:idT', async(req,res)=>{
    const PartID = parseInt(req.params.idP)
    const partner = await users.findOne({type:"partner",userID:PartID})
    const Task_id = parseInt(req.params.idT)
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
        description: Joi.string().required()
     };
 
    const result = Joi.validate(req.body, schema);

    if(result.error){
        return  res.status(400).send(result.error.details[0].message)
       }

    else { 

        const newUpdate= [
            {id: PartID,
             TaskID: Task_id, 
             description: changes,
             status: 'pending'
            }
          ];

          const updates = partner.updates
          updates.push(newUpdate)
          users.update({'userID':PartID},
          {$set: {'updates': updates}}, function(err, model){});
    
            const partners = await users.findOne({type:"partner",userID:PartID})
           res.json(partners)
       }
    }
}
});


 /////////////choose and send the applicant to the admin to assign/////////////////// Janna
 router.put('/:idP/:idT',(req,res)=>{
    const partnerID=parseInt(req.params.idP)
    
    const partner1= partner.find(partner1 => partner1.ID === partnerID)

    const taskID=parseInt(req.params.idT)
    
    const task1= partner1.Tasks.find(task1 => task1.taskID === taskID)

    const index = partner.indexOf(partner1)

    const index1=partner1.Tasks.indexOf(task1)

    const tasks=partner[index].Tasks[index1].applicants

   
    const applicantID = req.body.applicantID
    const schema = {

        applicantID:Joi.number().required()

    }
    const result=Joi.validate(req.body,schema)
   
    if(result.error)
     return res.status(400).send(error.details[0].message);

    
     const applicantq=partner[index].Tasks[index1].applicants.filter(applicantq=> applicantq.accepted===true)
     if(applicantq.length===0){
     const appl=partner[index].Tasks[index1].applicants.find(appl => appl.applicantID === applicantID && appl.accepted=== false)
     const applicant=partner[index].Tasks[index1].applicants.indexOf(appl)
 
     partner[index].Tasks[index1].applicants[applicant].accepted= true
     res.send(tasks);
    }
     else{
         res.send("you already accepted a member")
     }

 }); 


 






router.get('/', (req, res) => res.json({ data: partner }));





//delete booking from user array + change reserved to false in coworking space array 
router.delete('/RoomBookings/:userID/:bookingID', async (req,res) => {

	try {
		const userID=parseInt(req.params.userID);
		const bookingID= parseInt(req.params.bookingID);
   
        const temp = await RoomBookings.find({userID});
        if(!temp[0])res.send('user id does not exist');
    //res.send(temp);
		const book = temp[0].bookings;
    const temp2 =await book.find(r => r.bookingID === bookingID);
    if(!temp2){

        res.status(404).send('The booking with the given id is not found');

        return;

		};
		const roomID=parseInt(temp2.roomID);
		const scheduleID=parseInt(temp2.scheduleID);
		const coworkingSpaceID=parseInt(temp2.coworkingSpaceID);

    PartnerCoworkingSpace.update({ 'coworkingSpaceID':coworkingSpaceID,'rooms.id':roomID,'rooms.schedule.id':scheduleID}, 
    {$set: {'rooms.$.schedule.reserved':false}}, function(err, model){});
    
	 
	 RoomBookings.update( {userID}, { $pull: { bookings: {bookingID:bookingID} }
	 }, function(err, model){})
		
		
    res.send('booking has been deleted successfully')
	}

	catch(error) {

			// We will be handling the error later

			console.log(error)

	}  

})
//get contact info of admin
router.get('/contactAdmin',async (req,res)=>{
    
    const admin = await User.find({type:"admin"}) 
	res.send('email: '+admin[0].email+'   phone number: '+admin[0].phoneNumber);
 
 }); 




module.exports = router
