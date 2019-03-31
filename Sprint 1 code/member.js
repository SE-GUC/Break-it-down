
// const express = require('express')
// const users = require('../../models/UserProfile')
// const router = express.Router()
// const Joi = require('joi');


// //------------------------get all approved tasks------------------------------//
// router.get('/allTasks',async (req,res)=>{
//     //const member = await  users.find({type:"member"})
//     const partner=await  users.find({type:"partner"})
//     var tasks=[];
//     for(var i=0;i<partner.length;i++){
//         for(var j=0;j<partner[i].tasks.length;j++){
//             if(partner[i].tasks[j].approved=== true)
//             tasks.push(partner[i].tasks[j])
//         }
//     }

    

// res.send(tasks);

// }); 

// //---------------------------get the recommended tasks based on my field---------------------// 

// router.get('/recoTasks/:idM',async(req,res)=>{
//     const memID= parseInt(req.params.idM)
//     const member = await  users.findOne({type:"member", userID:memID})
//     const partner=await  users.find({type:"partner"})
//     var tasks=[];
//    // findOne()
 

//   let data=""
//      for(var i=0;i<partner.length;i++){
//          for(var j=0;j<partner[i].tasks.length;j++){
//              if(partner[i].tasks[j].field=== member.field && partner[i].tasks[j].approved=== true){
//              tasks.push(partner[i].tasks[j])
//              /*console.log(partner[i].tasks[j].field)
//              console.log(partner[i].tasks[j].taskID)
//              console.log(partner[i].tasks[j].name)
//              console.log(partner[i].tasks[j].description)
//              console.log(partner[i].userID)*/
             
//                 data += `<a href="/api/member/memID/${partner[i].tasks[j].taskID}">${partner[i].tasks[j].name}<br> ${partner[i].tasks[j].description}<br>${partner[i].name}</a><br>`;

//              console.log(data)
//             }
//          }
//         }

//  res.send(data);

 
//  });  

//  //------------------------apply for a task---------------------// 

// router.put('/ApplyForTask/:id/:idp/:idt', async (req,res) => {
//     const memID= parseInt(req.params.id)
//     const partnerID=parseInt(req.params.idp)
//     const partner= await users.findOne({type:'partner',userID:partnerID})

//     const taskIDb=parseInt(req.params.idt)
//     var taskapp={}
//     var applicantsapp=[]
//     var array_of_tasks=partner.tasks
    
//     for(var i=0;i<array_of_tasks.length;i++){
//         if(array_of_tasks[i].taskID===taskIDb && array_of_tasks[i].approved===true)
//         taskapp=array_of_tasks[i]    //you have a task that is approved with this given id 
//     } 
//    applicantsapp= taskapp.applicants
//    var app=[]

//    for(var j=0;j<applicantsapp.length;j++){
       
//        if(applicantsapp[j].accepted===true && applicantsapp[j].assigned===true && applicantsapp[j].applicantID !==memID ){
//            app.push(applicantsapp[j])
//        }
//    }

//    if(app.length===0)
//          {
//             applicantsapp.push({applicantID:memID,accepted:false,assigned:false})

//             users.update({ 'userID':partnerID,'tasks.taskID':taskIDb }, 
//             {$set: {'tasks.$.applicants':applicantsapp}}, function(err, model){}); 
            
//             const partnerx= await users.findOne({'type':'partner','userID':partnerID})
//             var final;
//             for(var i=0;i<partnerx.tasks.length;i++){
//                 if(partnerx.tasks[i].taskID===taskIDb)
//                 final=partnerx.tasks[i].applicants
//             }
//             //console.log(final)
//             res.json(final)

//          }
//     else
//     res.json("you can't apply for a task that already has a chosen member");

 


// });


// //---------------------------- member view his tasks------------------------// 
// router.get('/view/:id',async (req, response) => {
//     var data = "";
//     const memID= parseInt(req.params.id)
//     const member = await  users.findOne({type:"member",userID:memID})
//    console.log(member)
//     if(member===null) {
//          response.send("the databsae has no member with the given ID")
//     } else {
//         // Object is NOT empty
//         data=member.memberTasks
//          response.send(data);
//     }
   
// });

// //------------------------------- member gets his average rating  -----------------------------------//

// router.get('/MyRating/:MID', async(req, response) => {
   
//     const MID = parseInt(req.params.MID)
//     const member= await users.findOne({type:'member',userID:MID})
//     const AllMyRatings = member.allRatings
//     const Rlength = AllMyRatings.length
//     //console.log(Rlength)
//      var sum = 0;
//      var avg = 0;

//     if (Rlength !== 0)
//     {
//         sum = AllMyRatings.reduce(function(sum, b) { return sum + b; });
//         //console.log(sum)
//         avg = sum / Rlength
//        // console.log(avg)
//         response.json(avg)
//     }
//     else response.json(0)

// });





// module.exports = router

const axios = require('axios');
 var objectid = require('mongodb').ObjectID

const functions = {


        getBookings: async () => {

                const bookings = await axios.get('http://localhost:4000/api/member/roombookings/5')
                return bookings
        
                },

        getRoomSchedule: async () => {

                const sch = await axios.get('http://localhost:4000/api/member/cospace/3/rooms/1')
                
                 return sch
                
                },
        bookRoom: async()=>{
                const b = await axios.put('http://localhost:4000/api/member/cospace/3/5/rooms/2/1')
                return b
            },
        

        deleteBooking: async()=>{
                const k = await axios.get('http://localhost:4000/api/member/lastelem/')
             //   console.log(k)
                const c =objectid(k.data)
                 const url = 'http://localhost:4000/api/member/nourhan/RoomBookings/5/' + c
                const b = await axios.delete(url)
                return true
            },       

};

module.exports = functions;
