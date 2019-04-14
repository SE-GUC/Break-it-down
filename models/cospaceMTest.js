const uuid = require('uuid')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true")
autoIncrement.initialize(connection);

// The Event Model
const CoSpaceSchema= new Schema({ 

    name:{type:String,required: true},
    room:{type:Array,required: false},
    location:{type:String,required: true},
},
{ versionKey: false}

);

module.exports = cospaceM = mongoose.model('partnercoworkingspaces', CoSpaceSchema)