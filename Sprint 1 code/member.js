const axios = require('axios');
 var objectid = require('mongodb').ObjectID

const functions = {


        getBookings: async () => {

                const bookings = await axios.get('http://localhost:4000/api/member/roombookings/5')
                return bookings
        
                },

        getRoomSchedule: async () => {

                const sch = await axios.get('http://localhost:4000/api/member/cospace/3/rooms/1')
                
                 return sch
                
                },
        bookRoom: async()=>{
                const b = await axios.put('http://localhost:4000/api/member/cospace/3/5/rooms/2/1')
                return b
            },
        

        deleteBooking: async()=>{
                const k = await axios.get('http://localhost:4000/api/member/lastelem/')
             //   console.log(k)
                const c =objectid(k.data)
                 const url = 'http://localhost:4000/api/member/nourhan/RoomBookings/5/' + c
                const b = await axios.delete(url)
                return true
            },   
    getApprovedTasks: async () => {
            const allTasks = await axios.get('http://localhost:4000/api/member/allTasks')
            return allTasks
            },

    getRecomendedTasks: async () => {
          //get reco tasks  for member with id 5
           const recoTasks = await axios.get('http://localhost:4000/api/member/recoTasks/5')
           return recoTasks
                },  
     getMemTasks: async () => {
           //get membertasks for member with id 5
            const memTasks = await axios.get('http://localhost:4000/api/member/view/5')
             return memTasks
             },
     getMemAvgRating: async () => {
          //get membertasks for member with id 5
           const memRate = await axios.get('http://localhost:4000/api/member/MyRating/5')
           return memRate
                    },
    memberapply: async () => {
           const applyforTask = await axios.put('http://localhost:4000/api/member/ApplyForTask/10/1/0')
           return applyforTask
                                            }

};

module.exports = functions;
