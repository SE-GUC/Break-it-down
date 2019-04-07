const axios = require('axios');


const functions = {

    createEvent:async ()=>{
    
   return await axios.post('http://localhost:4000/api/Events',
    {name:'Malak Test',description:'This is my test event',date:'1/2/2020',
    location:'Test Room',coworkingspace:false})
    
  }

 ,
    getAllEvents: async () => {  
    return await axios.get('http://localhost:4000/api/Events')
  }
    ,

    getAnEvent: async () => {
            
         return await axios.get('http://localhost:4000/api/Events/5ca1440e1c9d440000684ff6')
    
    }
     ,
    updateEvent:  async()=>{
        return await axios.put('http://localhost:4000/api/Events/5ca1440e1c9d440000684ff6',{
            description:"I'm changing this"
        })
  
    }
    ,
    DeleteAnEvent: async () => {
        
        return await axios.delete('http://localhost:4000/api/Events/5ca2489dac6d81be602338a8')


    
    }
}

module.exports = functions;

