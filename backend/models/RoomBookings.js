const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({

    username : {
        type: String,
        required: true
    },
  
    bookings : {
        type: Array,
        required: true
    }
  
  })

  module.exports = RoomBookings = mongoose.model('roombookings', BookingSchema)

//const mongoose = require('mongoose');

//const Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;

//to create an id that autoincrements each time a document is added

autoIncrement=require('mongoose-auto-increment');

var connection=mongoose.createConnection("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true")

autoIncrement.initialize(connection);

// Create the schema



const RoomBookingsSchema = new Schema({

    //attributes that all users have in common
    _id:{type:ObjectId},
    userID:{type:Number,required:true},
    bookings:[{
                  coworkingSpaceID:{type:Number,required:true},
                  roomID:{type:Number,required:true},
                  scheduleID : {type:Number,required:true},
                  Date:{type:Date,required:true}, 
                  time: {type:Number,required:true},
                  bookingID:{type:Number,required:true}
                  }]
        
    
});





RoomBookingsSchema.plugin(autoIncrement.plugin,'RoomBookings');

module.exports = RoomBookings = connection.model('RoomBookings', RoomBookingsSchema);