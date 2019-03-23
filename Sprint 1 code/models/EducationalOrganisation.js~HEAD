const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*An educational organizationʼs profile should hold their basic information, 
the courses they offer, their trainers/educators, the certificates they supply and their training programs*/
const EducationalOrganisationSchema= new Schema({ 
    type:{type:String,required: false},
    name:{type:String,required: false},
    email:{type:String,required: false},
    phoneNumber:{type:Number,required: false},
    address:{type:String,required: false},
    description:{type:String,required: false},
    trainers:{type:Array,required: false},
    trainingPrograms:{type:Array,required: false},
    certificates:{type:Array,required: false},
},
{ versionKey: false}
);
module.exports = EducationalOrganisation = mongoose.model('EducationalOrganisation', EducationalOrganisationSchema)
