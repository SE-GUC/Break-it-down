// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();
const User = require('../../models/UserProfile');


router.get('/filterTasks/:memberID', async (req, res) =>{
try{
	//Member skills
	const memberSkills = await User.findOne({type:"member",'_id':parseInt(req.params.memberID)},{skills:1,_id:0})
	//Member field
	const memberField = await User.findOne({type:"member",'_id':parseInt(req.params.memberID)},{field:1,_id:0})
	//Resulting tasks
	var recommendedTasks=[]
	//All partner tasks
	const grptasks = await User.find({type:"partner"},{"tasks":1,_id:0})
	//var grpTasks= groupBy2(tasks,'field')

	for (var i = 0; i < grptasks.length; i++) {
		for (var j =0; j< grptasks[i].tasks.length; j++){
		if(grptasks[i].tasks[j].approved===true && grptasks[i].tasks[j].lifeCycle[1]===false && grptasks[i].tasks[j].field===memberField.field)
		{
			recommendedTasks.push(grptasks[i].tasks[j])
		}
		}
}

res.json(recommendedTasks)

}
catch(error){
	res.send(error)
}


});

function groupBy2(xs, prop) {
  var grouped = {};
  for (var i=0; i<xs.length; i++) {
    var p = xs[i][prop];
    if (!grouped[p]) { grouped[p] = []; }
    grouped[p].push(xs[i]);
  }
  return grouped;
}





module.exports = router;
