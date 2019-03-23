
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cospaceSchema = new Schema({

    id2 : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    rooms :{
        type : Array,
        required : true
    }
  
  })

  module.exports = PartnerCoworkingSpace = mongoose.model('coworkingSpace', cospaceSchema)

//const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

//to create an id that autoincrements each time a document is added

autoIncrement=require('mongoose-auto-increment');

var connection=mongoose.createConnection("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true")

autoIncrement.initialize(connection);

// Create the schema



const CoworkingSpaceSchema = new Schema({

    coworkingSpaceID:{type:Number,required:true},
    name:{type:String,required:true},
    rooms:{type:Array}
        
});





CoworkingSpaceSchema.plugin(autoIncrement.plugin,'partnercoworkingspaces');

module.exports = PartnerCoworkingSpace = connection.model('partnercoworkingspaces', CoworkingSpaceSchema);

