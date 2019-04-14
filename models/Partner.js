
//-------------to be used later when we update our database----------------//


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartnerSchema= new Schema({ 
    type:{String,required: false},
    name:{type:String,required: false},
    email:{type:String,required: false},
    address:{type:String,required: false},
    phoneNumber:{type:Number,required: false},
    field:{type:String,required: false},
    partners:{type:Array,required: false},
    description:{type:String,required: false},
    boardMembers:{type:Array,required: false},
    events:{type:Array,required: false}
},
{ versionKey: false}

);
module.exports = Partner = mongoose.model('Partner', PartnerSchema)