const axios = require('axios');
var objectid = require('mongodb').ObjectID

const functions = {

        //add: (x,y) => x+y,
        getallcoworkingspace: async () => {

            const cospaces = await axios.get('http://localhost:4000/api/consultancyAgency/PartnerCoworkingspaces')
    
    
            return cospaces
    
            },
    
        getAcoworkingspace: async () => {
    
            const cospace = await axios.get('http://localhost:4000/api/consultancyAgency/PartnerCoworkingspaces/3')
    
            return cospace
    
            },

        sendingMessageToAdmin: async (name1,message1,email1) =>{
            const message = await axios.post('http://localhost:4000/api/consultancyAgency/messages',{
            name:name1,
            message:message1,
            email:email1});
            return message;
    
            },

            getBookingsCA: async () => {

                const bookings = await axios.get('http://localhost:4000/api/consultancyAgency/roombookings/2007')
                return bookings
        
                },

        getRoomScheduleCA: async () => {

                const sch = await axios.get('http://localhost:4000/api/consultancyAgency/cospace/300/rooms/1')
                
                 return sch
                
                },
        bookRoomCA: async()=>{
                const b = await axios.put('http://localhost:4000/api/consultancyAgency/cospace/300/2007/rooms/2/2')
                return b
            },

            deleteBookingCA: async()=>{

                const k = await axios.get('http://localhost:4000/api/consultancyAgency/lastelem/')
                console.log(k.data)
                const c =objectid(k.data)
                 const url = 'http://localhost:4000/api/consultancyAgency/nourhan/RoomBookings/2007/' + c
                const b = await axios.delete(url)
                return true
            },

        

};

module.exports = functions;