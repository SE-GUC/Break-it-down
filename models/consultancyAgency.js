

//----------------to be used for the updated sprint-------------------------//

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const consultancyAgencySchema= new Schema({ 

    name:{type:String,required: false},
    type:{type:String,required: false},
    email:{type:String,required: false},
    //consultancyAgencyTasks:{type:Array,required: false},
    phoneNumber:{type:Number,required: false},
    description:{type:String,required: false},
    address:{type:String,required: false},
    partners:{type:Array,required: false},
    boardMembers:{type:Array,required: false},
    events:{type:Array,required: false},
    reports:{type:Array,required: false},
    activation:{type:Boolean,default:false},
},
{ versionKey: false}

);
module.exports = consultancyAgency = mongoose.model('consultancyAgency', consultancyAgencySchema)