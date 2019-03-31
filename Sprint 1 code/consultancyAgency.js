const axios = require('axios');

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
    
            }

        

};

module.exports = functions;