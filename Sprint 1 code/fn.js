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
                    },
        getPartnerLifeCycle: async () => {
               
                 const lifeCycle = await axios.get('http://localhost:4000/api/partner/TaskLifeCycle/1/0')
                 return lifeCycle
                                                },
          memberapply: async () => {
           const applyforTask = await axios.put('http://localhost:4000/api/member/ApplyForTask/10/1/0')
           return applyforTask
                                            },
     acceptapp: async () => {
           const appl = await axios.put('http://localhost:4000/api/partner/AcceptApplicant/1/1',{'applicantID':1})
           return appl
                     },

              partnerReviewRate: async () => {
                        const rateAndReview = await axios.put('http://localhost:4000/api/partner/Review&Rate/1/0',
                               {
                                "rating": 4,
                                "review": "hellooo"
                        })
        
                        return rateAndReview
                },
            partnerPostTask: async () => {
              const posted = await axios.post('http://localhost:4000/api/partner/CreateTask/1',
                {	
                 "name": "test",
                "description": "testing with jtest", 
                "wantsConsultant": true
                        })
        
                  return posted
                },
       ChooseConsultancyAgency: async () => {
       const consultancy = await axios.put('http://localhost:4000/api/partner/ChooseConsultancyAgency/1/1', { "consultancyID":2})  
        return consultancy
           },
  ChooseApplicant: async () => {
      const applicant = await axios.put('http://localhost:4000/api/partner/AcceptApplicant/1/1', {"applicantID":1})  
       return applicant
           },

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
