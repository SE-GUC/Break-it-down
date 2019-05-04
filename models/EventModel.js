const uuid = require('uuid')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var ObjectID = require('mongodb').ObjectID;

var connection=mongoose.createConnection("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true")
autoIncrement.initialize(connection);

// The Event Model
const EventSchema= new Schema({ 
    userID:{type:ObjectID},
    name:{type:String,required: true},
    description:{type:String,required: false},
    date:{type:Date,required: true},
    location:{type:String,required: true},
    coworkingspace:{type:Boolean,default:false},
    time:{type:String,required: false},
},
{ versionKey: false}

);

module.exports = Event = mongoose.model('Event', EventSchema)

