// Dependencies
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path=require('path');

var bodyParser = require('body-parser')
//chat

const Message = require('../../models/messages')

router.get('/', function(req, res){
	res.sendFile(path.resolve('./cachat.html'));
});

router.get('/sent/:name',async(req, res)=>{
    const chat=await Message.find({name:req.params.name})
    res.json({ data: chat })
})

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

	finally{

		console.log('Message Posted');

	}



})






//................................................................
module.exports = router;