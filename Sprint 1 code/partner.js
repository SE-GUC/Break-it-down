const axios = require('axios');
var objectid = require('mongodb').ObjectID

const functions = {                
partnerRequestDescriptionChange: async()=> {
                        const descriptionChange = await axios.put('http://localhost:4000/api/partner/RequestDescriptionChange/1/0',
                        {
                                "description":"ooooooo"
                        })
                        return descriptionChange
                },
  
   getPartnerLifeCycle: async () => {
               
                 const lifeCycle = await axios.get('http://localhost:4000/api/partner/TaskLifeCycle/1/0')
                 return lifeCycle
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

           getBookingsp: async () => {

                const bookings = await axios.get('http://localhost:4000/api/partner/roombookings/101')
                return bookings
        
                },

        getRoomSchedulep: async () => {

                const sch = await axios.get('http://localhost:4000/api/partner/cospace/300/rooms/1')
                
                 return sch
                
                },
        bookRoomp: async()=>{
                const b = await axios.put('http://localhost:4000/api/partner/cospace/300/101/rooms/2/2')
                return b
            },

            deleteBookingp: async()=>{

                const k = await axios.get('http://localhost:4000/api/partner/lastelem/')
                console.log(k.data)
                const c =objectid(k.data)
                 const url = 'http://localhost:4000/api/partner/nourhan/RoomBookings/101/' + c
                const b = await axios.delete(url)
                return true
            },
  
  };

module.exports = functions;
