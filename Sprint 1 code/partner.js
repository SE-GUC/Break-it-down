const axios = require('axios');

const functions = {                
partnerRequestDescriptionChange: async()=> {
                        const descriptionChange = await axios.put('http://localhost:4000/api/partner/RequestDescriptionChange/1/0',
                        {
                                "description":"ooooooo"
                        })
                        return descriptionChange
                }
  
  };

module.exports = functions;
