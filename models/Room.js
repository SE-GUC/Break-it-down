const mongoose = require('mongoose')
const Schema = mongoose.Schema

//to create an id that autoincrements each time a document is added
autoIncrement=require('mongoose-auto-increment');

var connection=mongoose.createConnection("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true")
autoIncrement.initialize(connection);

// Create the schema
const RoomSchema = new Schema({
    id:Number,
    capacity: {
    type: Number,
    required: true,
    },
   roomNumber: {
        type: Number,
        required: true

    },
    schedule: {
        type: Array,
        required: true,

    }

})

module.exports = Room = mongoose.model('cospaceRooms', RoomSchema)
