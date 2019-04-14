const axios = require('axios');
const User = require('./models/UserProfile');

const functions = {

    
  createAccountMember:async ()=>{
    const users=await User.find({'type':'member'});
    const x=users.length;
    console.log(x)
    await axios.post('http://localhost:4000/api/CreateAccount/member',
    {field:'test',memberTasks:[],name:'test',password:'test','birthday':'1/2/2003',
    'email':'testing@test.com','phoneNumber':'100000'})
    .then(function (response) {
        console.log('member create is successful')
   })
   .catch(function (error) {
     console.log(error)
   });
   const newUsers=await User.find({'type':'member'});
    const y=newUsers.length;
    console.log(y);
    await User.deleteOne({'email':'testing@test.com'})	
   
    if(y==x+1)
     return true
     else return false
 },
 createAccountPartner:async ()=>{
  const users=await User.find({'type':'partner'});
  const x=users.length;
  console.log(x)
  await axios.post('http://localhost:4000/api/CreateAccount/partner',
  {name:'test',tasks:[],password:'12345',email:'testingPartner@test.com',
  address:'test',website:'test','phoneNumber':'00000001','field':'test',description:'test',partners:[],boardMembers:[] ,events:[] })
  .then(function (response) {
      console.log('partner create is successful')
 })
 .catch(function (error) {
   console.log(error)
 });
 const newUsers=await User.find({'type':'partner'});
  const y=newUsers.length;
  console.log(y);
  await User.deleteOne({'email':'testingPartner@test.com'})	
 
  if(y==x+1)
   return true
   else return false
},
createAccountCoworkingSpace:async ()=>{
  const users=await User.find({'type':'coworkingSpace'});
  const x=users.length;
  console.log(x)
  await axios.post('http://localhost:4000/api/CreateAccount/coworkingSpace',
  {name:'test',tasks:[],password:'12345',email:'testingcoworkingSpace@test.com',
  address:'test',website:'test','phoneNumber':'00000001','field':'test',description:'test',facilities:[],rooms:[]})
  .then(function (response) {
      console.log('coworking space create is successful')
 })
 .catch(function (error) {
   console.log(error)
 });
 const newUsers=await User.find({'type':'coworkingSpace'});
  const y=newUsers.length;
  console.log(y);
  await User.deleteOne({'email':'testingcoworkingSpace@test.com'})	
 
  if(y==x+1)
   return true
   else return false
}
,
createAccountEducationalOrganization:async ()=>{
  const users=await User.find({'type':'educationalOrganization'});
  const x=users.length;
  console.log(x)
  await axios.post('http://localhost:4000/api/CreateAccount/educationalOrganization',
  {name:'test',tasks:[],password:'12345',email:'educationalOrganization@test.com',
  address:'test',website:'test','phoneNumber':'00000001',description:'test','trainers':[],trainingPrograms:[],certificates:[]})
  .then(function (response) {
      console.log('educational organization create is successful')
 })
 .catch(function (error) {
   console.log(error)
 });
 const newUsers=await User.find({'type':'educationalOrganization'});
  const y=newUsers.length;
  console.log(y);
  await User.deleteOne({'email':'educationalOrganization@test.com'})	
 
  if(y==x+1)
   return true
   else return false
} 
,
createAccountConsultancyAgency:async ()=>{
  const users=await User.find({'type':'consultancyAgency'});
  const x=users.length;
  console.log(x)
  await axios.post('http://localhost:4000/api/CreateAccount/consultancyAgency',
  {name:'test',tasks:[],password:'12345',email:'consultancyAgency@test.com',
  address:'test',website:'test','phoneNumber':'00000001',description:'test',partners:[],boardMembers:[],events:[],reports:[]})
  .then(function (response) {
      console.log('consultancy agency create is successful')
 })
 .catch(function (error) {
   console.log(error)
 });
 const newUsers=await User.find({'type':'consultancyAgency'});
  const y=newUsers.length;
  console.log(y);
  await User.deleteOne({'email':'consultancyAgency@test.com'})	
 
  if(y==x+1)
   return true
   else return false
} ,
createAccountAdmin:async ()=>{
  const users=await User.find({'type':'admin'});
  const x=users.length;
  console.log(x)
  await axios.post('http://localhost:4000/api/CreateAccount/admin',
  {name:'test',password:'12345',email:'admin@test.com','phoneNumber':'00000001'})
  .then(function (response) {
      console.log('consultancy agency create is successful')
 })
 .catch(function (error) {
   console.log(error)
 });
 const newUsers=await User.find({'type':'admin'});
  const y=newUsers.length;
  console.log(y);
  await User.deleteOne({'email':'admin@test.com'})	
 
  if(y==x+1)
   return true
   else return false
} 
   

        

};

module.exports = functions;