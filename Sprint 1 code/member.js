const axios = require('axios');
const User = require('./models/UserProfile');

const functions = {


	getRoomBookings: async () => {

        const bookings = await axios.get('http://localhost:4000/api/member/roombookings/505')
        console.log(bookings.data[0].RoomsBooked.length)
        return bookings

        },

    deleteBooking: async ()=>{
        await User.findOneAndUpdate({'userID':506}, 
        {$set: {'RoomsBooked':[{'bookingID':6565,'coworkingSpaceID':3,'roomID':5,'scheduleID':7,'Date':'2019-01-01T22:00:00.000+00:00','time':10},{'x':1}]}}, function(err, model){});    
         const bookings = await axios.get('http://localhost:4000/api/member/roombookings/506');
        const x=bookings.data[0].RoomsBooked.length;
        //console.log('x='+x)
        if(x==0)return true;
        const deleted= await axios.delete('http://localhost:4000/api/member/RoomBookings/506/6565');
        const bookings2 = await axios.get('http://localhost:4000/api/member/roombookings/506');
        const y=bookings2.data[0].RoomsBooked.length;
        //console.log('y='+y)
        if(x-1==y) return true;
        else return false;
         
    }      

};

module.exports = functions;