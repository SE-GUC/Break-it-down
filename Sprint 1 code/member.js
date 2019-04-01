const axios = require('axios');
const User = require('./models/UserProfile');
const objectid = require('mongodb').ObjectID
//const User = require('./models/Member');


const functions = {


	getRoomBookings: async () => {

        const bookings = await axios.get('http://localhost:4000/api/member/roombookings/505')
        console.log(bookings.data[0].RoomsBooked.length)
        return bookings

        },

    deleteRoomBooking: async ()=>{
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
         
    }   ,   
        deleteBooking: async()=>{
                const k = await axios.get('http://localhost:4000/api/member/lastelem/')
             //   console.log(k)
                const c =objectid(k.data)
                 const url = 'http://localhost:4000/api/nourhan/member/nourhan/RoomBookings/5/' + c
                const b = await axios.delete(url)
                return true
            },
            getallcoworkingspace: async () => {

                const cospaces = await axios.get('http://localhost:4000/api/member/PartnerCoworkingspaces')
        
        
                return cospaces
        
                },
        
        getAcoworkingspace: async () => {
        
                const cospace = await axios.get('http://localhost:4000/api/member/PartnerCoworkingspaces/7')
        
                return cospace
        
                },
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
            
    
            deleteBookingtest: async()=>{
    
                    const k = await axios.get('http://localhost:4000/api/member/lastelem/')
                    console.log(k.data)
                    const c =objectid(k.data)
                     const url = 'http://localhost:4000/api/member/nourhan/RoomBookings/5/' + c
                    const b = await axios.delete(url)
                    return true
                },  

       

    createMember:async ()=>{
    
   return await axios.post('http://localhost:4000/api/Member',
    {name:'Malak Test',phoneNumber:7775000 , email:"test@gmail.com"}
   )
  }

 ,
    getAllMembers: async () => {  
    return await axios.get('http://localhost:4000/api/Member')
  }
    ,

    getAnMember: async () => {
            
         return await axios.get('http://localhost:4000/api/Member/5c94f52e1c9d44000083f3a5')
    
    }
     ,
    updateMember:  async()=>{
        return await axios.put('http://localhost:4000/api/Member/5c94f52e1c9d44000083f3a5',{
            interests:"Passing"
        })
  
    }
    ,
    DeleteAnMember: async () => {
        
        return await axios.delete('http://localhost:4000/api/Member/5c95f8f0b301de04e05d2979')


    
    }




};

module.exports = functions;
