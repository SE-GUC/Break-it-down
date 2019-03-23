const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({

    userID : {
        type: Number,
        required: true
    },
  
    bookings : {
        type: Array,
        required: true
    }
  
  })

  module.exports = RoomBookings = mongoose.model('roombookings', BookingSchema)



// module.exports = RoomBookings = [
//     {
//         userID:1,
//         bookings:[{bookingID:1,
//                   coworkingSpaceID:1,
//                   roomID:1,
//                   scheduleID : 1,
//                   Date:"2019-10-01", 
//                   time: 7
//                   }]
        
//     },
//     {
//         userID:2,
//         bookings:[{bookingID:1,
//             coworkingSpaceID:1,
//             roomID:2,
//             scheduleID : 2,
//             Date:"2019-10-02", 
//             time: 8
//             },
//             { bookingID:2,
//              coworkingSpaceID:1,
//              roomID:2,
//              scheduleID : 1,
//              Date:"2019-10-03", 
//              time: 10}
//                 ]
  
//     },
//     {
//         userID:3,
//         bookings:[{bookingID:1,
//             coworkingSpaceID:2,
//             roomID:5,
//             scheduleID : 1,
//             Date:"2019-11-03", 
//             time: 8
//             },
//             { bookingID:2,
//              coworkingSpaceID:3,
//              roomID:3,
//              scheduleID : 1,
//              Date:"2019-09-10", 
//              time: 6},
//              { bookingID:3,
//              coworkingSpaceID:1,
//              roomID:4,
//              scheduleID : 1,
//              Date:"2019-11-01", 
//              time: 10}
//                 ]
  
//     },
    
// ]