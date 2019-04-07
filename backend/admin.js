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
  
         viewconsultancyagencymessages: async()=>{
                 const messages=await axios.get('http://localhost:4000/api/admins/viewmessages')
                 return messages;
         },
		 
		  viewUpdatesByAdmin: async () => {

        var axiosInstance = axios.create({
                 validateStatus: function (status) {
                        return status >= 200 && status <= 503;
                 },
            
      })

        const updates = await axiosInstance.get('http://localhost:4000/api/admins/viewUpdates')
        
        const status=updates.status

        if(status===200)
                return updates.data
        else if(status===404)
                throw new Error('No updates found')

        },
        approveUpdatesByAdmin: async (id,uid) => {
         var axiosInstance = axios.create({
                validateStatus: function (status) {
                         return status >= 200 && status <= 503;
                },
                   
        })

        const updates = await axiosInstance.put(`http://localhost:4000/api/admins/approveUpdates/${id}/${uid}`)
        
        const status=updates.status

        if(status===200)
                return updates.data
        else if(status===404)
                throw new Error(updates.statusText)
        
        },

        disapproveUpdatesByAdmin: async (id,uid) => {
        var axiosInstance = axios.create({
                validateStatus: function (status) {
                      return status >= 200 && status <= 503;
                },
                           
        })

        const updates = await axiosInstance.delete(`http://localhost:4000/api/admins/disapproveUpdates/${id}/${uid}`)
        
        const status=updates.status

        if(status===200)
                return updates.data
        else if(status===404)
                throw new Error(updates.statusText)
        
         },
 

};

module.exports = functions;
