const axios = require('axios');

const functions = {

     

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
      getPartnerTasks: async () => {
             
             const partnertasks = await axios.get('http://localhost:4000/api/partner/view/1/0')
             return partnertasks
                    }
                    
                          
};

module.exports = functions;
