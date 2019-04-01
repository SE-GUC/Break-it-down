const axios = require('axios');

const functions = {
        

getCospace: async () => {

const cospace = await axios.get('http://localhost:4000/api/coworkingSpace/viewCospace/5263')
// console.log(cospace)
return cospace

},

getCospaceRoom: async () => {

const rooms = await axios.get('http://localhost:4000/api/coworkingSpace/viewRoom/5263/1')
//console.log(rooms.data)
return rooms
},

getAllCospaces: async () => {

const cospaces = await axios.get('http://localhost:4000/api/coworkingSpace/viewCoworkingSpace')
//console.log(cospaces.data)
return cospaces
},

getSchedule: async () => {

const schedules = await axios.get('http://localhost:4000/api/coworkingSpace/viewRoomSchedule/5263/1')
//console.log(schedules.data)
return schedules
},

updateCospace: async () => {
const updateSchema = {
    name: "SUPERNOVA"
    };
    axios.put(
    "http://localhost:4000/api/coworkingSpace/updateCospace/5263",
    updateSchema
    );
    const updatedCospace = axios.get("http://localhost:4000/api/coworkingSpace/viewCospace/5263")
   // console.log(updatedCospace.data)
    return updatedCospace;
},

createRoom: async () => {
  
        const room= axios.post(
                "http://localhost:4000/api/coworkingSpace/createRoom/5263", {
                    id: 2,
                    capacity: 160,
                    schedule: [{id: 1, reserved: false, Date: 6/6/2019, time: 9}]
                    })
               // .then(token => { return token } )
          
        
      //    console.log(room)

        const createdRoom = axios.get("http://localhost:4000/api/coworkingSpace/viewRoom/5263/2")
        
        //console.log(createdRoom)
        return createdRoom;
},

createRoomSchedule: async () => {
  
    const schedule= axios.post(
            "http://localhost:4000/api/coworkingSpace/createSchedule/5263/1", 
                {
                    "id": 5,
                    "Date": "9/8/2019",
                    "time": 11
                })
      
    
      //console.log(schedule)

    const createdSch = axios.get("http://localhost:4000/api/coworkingSpace/viewRoomSchedule/5263/1")
    axios.delete('http://localhost:4000/api/coworkingSpace/deleteSchedule/5263/1/5')
   // console.log(createdSch)
    return createdSch;
},

deleteRoom: async() => {
    const beforeDelete = axios.get("http://localhost:4000/api/coworkingSpace/viewCospace/5264")
    //console.log(roomToDel)
    const newRoom = axios.post(
    
        "http://localhost:4000/api/coworkingSpace/createRoom/5264", {
        id: 15,
        capacity: 160,
        schedule: [{id: 1, reserved: false, Date: 6/6/2019, time: 9}]
        })
        const removedRoom = await axios.delete(
            'http://localhost:4000/api/coworkingSpace/deleteRoom/5264/15'
            );
    const response = await axios.get('http://localhost:4000/api/coworkingSpace/viewCospace/5264');

    return (beforeDelete.data.rooms.length===response.data.rooms.length && removedRoom.data==={msg: "Deleted"})
},

reserveSchedule: async () =>{
    axios.put('http://localhost:4000/api/coworkingSpace/reserve/5263/101/1')
    const schedule = axios.get("http://localhost:4000/api/coworkingSpace/viewRoomSchedule/5263/101")
    return schedule
},
	viewCoworkingspaceSuggestions: async (id) => {

        var axiosInstance = axios.create({
                validateStatus: function (status) {
                        return status >= 200 && status <= 503;
                },
                   
        })
        

        const suggestions = await axiosInstance.get(`http://localhost:4000/api/coworkingSpace/CoworkingSpace/Suggestions/${id}`)

        const status=suggestions.status

        if(status===200)
                return suggestions.data
        else if(status===404)
                throw new Error('No room suggestions found')

   },
        updateRoomBooking: async (bid) => {

        var axiosInstance = axios.create({
                validateStatus: function (status) {
                        return status >= 200 && status <= 503;
                },
                           
        })

        const suggestions = await axiosInstance.put(`http://localhost:4000/api/coworkingSpace/update/booking/${bid}`)
        const status=suggestions.status

        if(status===200)
                return suggestions.data
        else if(status===404)
                throw new Error('Could not find an empty room with the desired capacity in the same coworking space')
        
        
                },

                getallcoworkingspace: async () => {

                        const cospaces = await axios.get('http://localhost:4000/api/coworkingSpace/viewCoworkingSpace')
                
                
                        return cospaces
                
                        },
                
                getAcoworkingspace: async () => {
                
                        const cospace = await axios.get('http://localhost:4000/api/coworkingSpace/viewCospace/9')
                
                        return cospace
                
                        },

        



};

module.exports = functions;