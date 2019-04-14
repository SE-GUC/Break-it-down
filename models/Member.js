

//-------------to be used later when we update our database----------------//


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema= new Schema({ 
    type:{String,required: false},
    name:{type:String,required: false},
    email:{type:String,required: false},
    birthday:{type:Date,required: false},
    phoneNumber:{type:Number,required: false},
    skills:{type:String,required: false},
    interest:{type:String,required: false},
    accomplishments:{type:String,required: false},
    certificates:{type:String,required: false},
},
{ versionKey: false}

);
module.exports = Member = mongoose.model('Member', MemberSchema)