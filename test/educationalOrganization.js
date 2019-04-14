const axios = require('axios');


const functions = {

    createEducationalOrganization:async ()=>{
    
   return await axios.post('http://localhost:4000/api/educationalOrganization',
    {name:'Nour Test Edu', email:"test@gmail.com"}
   )
  }

 ,
    getAllEducationalOrganizations: async () => {  
    return await axios.get('http://localhost:4000/api/educationalOrganization')
  }
    ,

    getAnEducationalOrganization: async () => {
            
         return await axios.get('http://localhost:4000/api/educationalOrganization/5c9690d3a7fc823188fedd40')
    
    }
     ,
    updateEducationalOrganization:  async()=>{
        return await axios.put('http://localhost:4000/api/educationalOrganization/5c96805f1c9d440000e68a32',{
            name:"roz"
        })
  
    }
    ,
    DeleteAnEducationalOrganization: async () => {
        
        return await axios.delete('http://localhost:4000/api/educationalOrganization/5ca25e461c9d440000fbca4c')


    
    }
}

module.exports = functions;
