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