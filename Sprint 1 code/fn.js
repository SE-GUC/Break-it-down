const axios = require('axios');

const functions = {

AssignApplicant: async () => {
         const aapplicant = await axios.put('http://localhost:4000/api/admin/AssignMember/1/1')  
         return aapplicant
                     },
        AssignConsultancy: async () => {
           const aapplicant = await axios.put('http://localhost:4000/api/admin/AssignConsultancyAgency/1/1')  
            return aapplicant
                },

                adminActivateAccount: async () => {
                        const activated = await axios.put('http://localhost:4000/api/admin/ActivateAccounts/10',{'activate': true})
                        return activated
                },
        
                adminCheckTaskDescription: async () => {
                        const description = await axios.get('http://localhost:4000/api/admin/CheckTaskDescriptions/1/0')
                        return description
                },
        
                adminApproveTask: async () => {
                        const approved = await axios.put('http://localhost:4000/api/admin/ApproveTasks/1/3',{'approval': true})
                        return approved
                },
        
                partnerRequestDescriptionChange: async()=> {
                        const descriptionChange = await axios.put('http://localhost:4000/api/partner/RequestDescriptionChange/1/0',
                        {
                                "description":"ooooooo"
                        })
                        return descriptionChange
                }
        

};

module.exports = functions;
