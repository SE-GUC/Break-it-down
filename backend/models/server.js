const User = require('../models/ChatUser');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
users=[];
connections=[];
const messages=require('../models/messages2');



//all events we will send will be done here 
module.exports=
io.sockets.on('connection',function(socket){
   connections.push(socket);
   this.emit('x','yes');
   console.log('Connected: %s sockets connected',connections.length);

   //Disconnect
   socket.on('disconnect',function(data){
     //if(!socket.username)return;
     users.splice(users.indexOf(socket.username),1);
     updateUsernames();
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected: %s sockets connected',connections.length); 
   });


   //send message to destination
   socket.on('send message',async function(data){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     if(socket.username==='Admin'){
       var name= data.substr(0, data.indexOf(',')); 
      var msg = data.substring(data.indexOf(',') + 1);
      const user=users.find(e => e.name === name );
      if(!user) {
        await messages.findOneAndUpdate({name:name},{'$push':{'chat':{message:"Admin:"+msg,date:date}}},{upsert:true});
        socket.emit('new message',{msg:'This user is online right now, your message is saved',user:'Sever'});
      }
        else{
       await messages.findOneAndUpdate({name:socket.username},{'$push':{'chat':{message:"Admin:"+msg,date:date}}},{upsert:true});
       io.to(user.id).emit('new message',{msg:msg,user:socket.username});
       socket.emit('new message',{msg:msg,user:'you'});}
     }
     else{
     var msg=data;
     await messages.findOneAndUpdate({name:'Admin'},{'$push':{'chat':{message:socket.username+":"+data,date:date}}},{upsert:true});
     const user=users.find(e => e.name === 'Admin' );
     
     //if there isn't any admins online
     if(!user) {
      await messages.findOneAndUpdate({name:socket.username},{'$push':{'chat':{message:data,date:date}}},{upsert:true});
      socket.emit('new message',{msg:'No admin is available right now, your message is saved',user:'Sever'});
      socket.emit('new message',{msg:msg,user:'you'});
    }
      else{
     await messages.findOneAndUpdate({name:socket.username},{'$push':{'chat':{message:data,date:date}}},{upsert:true});
     io.to(user.id).emit('new message',{msg:msg,user:socket.username});
     socket.emit('new message',{msg:msg,user:'you'});}
      }
   });

   //New User
   socket.on('new user',function(data,callback){
     callback(true);
     socket.username=data;
     const user=new User (socket.id,data);
     socket.broadcast.emit('new message',{msg:'new user: '+socket.username,user:'Sever:'});
     users.push(user);
     getoldmessages(user.name);
     updateUsernames();
   });
   //sending location
   socket.on('sendLocation',function(coords){
     io.sockets.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
     
  });

  //get old chat history 
  async function getoldmessages (name){  
    try{
    const Messages=await messages.find({name:name},{chat: 1,_id:0}).sort({'chat.date':1});
    //console.log(Messages[0].chat)
    socket.emit('old messages',Messages[0].chat);}
    catch(error){console.log("no chat history found")}
   }

   function updateUsernames(){
     io.sockets.emit('get users',users);
   }


   });