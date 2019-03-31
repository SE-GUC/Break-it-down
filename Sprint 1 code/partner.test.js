
const funcs = require('./partner');
//------------partner getter test------------------//
test('Partner view applicants for a task', async () => {

  expect.assertions(1)
  const response =  await funcs.getPartnerTasks();
  //console.log(response.data.task)
  expect(typeof response.data.task).toBe('object')

});

test('partner view a task life cycle ', async () => {

  expect.assertions(1)
  const response =  await funcs.getPartnerLifeCycle();
  //console.log(response.data.lifeCyc[0])
  
  expect(typeof response.data.lifeCyc[0]).toBe('boolean')

});
//------------partner put test------------------//
test('partner review and rate', async () => {
  expect.assertions(1)
  const response =  await funcs.partnerReviewRate()
  if(typeof response.data==="string"){
    expect(response.data).toContain("the")
  }
  
 
  else{
    expect(response.data.tasks.rate).not.toBe(0)
    expect(response.data.tasks[0].review).toBeTruthy()
  }
});
  
  test('partner post a task description', async () => {
  expect.assertions(1)
  const response =  await funcs.partnerPostTask()
  console.log(response.data.name)
  expect(response.data.name).toContain('test')
});

test('partner choose a consultancy agency', async () => {
  expect.assertions(1)
  const response =  await funcs.ChooseConsultancyAgency()
  //console.log(response.data)
  //console.log(typeof response.data)
  if(typeof response.data==="string"){
    expect(response.data).toContain("the")
  }
  //console.log(response.data)
  else{
    expect(response.data.accepted).toBe(true)
  }
});

test('choose and send the applicant to the admin to assign', async () => {
  expect.assertions(1)
  const response =  await funcs.ChooseApplicant()
  if(typeof response.data==="string"){
    expect(response.data).toContain("the")
  }
  //console.log(response.data)
  else{
    expect(response.data.accepted).toBe(true)
  }
});

test('partner request description change', async () => {

  expect.assertions(1)
  const response = await funcs.partnerRequestDescriptionChange()
  expect(response.data.length).toBeGreaterThanOrEqual(1)


});

test('Number of bookings of partner with id 101 should be 3', async (done) => {

  expect.assertions(1)

  const response =  await funcs.getBookingsp()
  //console.log(response.data)
  expect(response.data.data.length).toBe(3)
  done()
});

test('Number of schedules of coworkingSpace with id 300 and room id 1 should be 1', async (done) => {

  expect.assertions(1)

  const r = await funcs.getRoomSchedulep()
 // console.log(r.data)
  expect(r.data.data.length).toBe(1)
  done()
});

test('Room should be booked for partner 101', async (done) => {
  expect.assertions(1)
  const response =  await funcs.bookRoomp()
  console.log(response.data)
  expect(response.data.data).toBe(true)
  done()
});

//just to delete the last booking made by the test
test('delete the last entry',async (done)=>{
 // expect.assertions(1)
  const r =await funcs.deleteBookingp()

 expect(r).toBe(true)
 console.log(r)
 done();
})  



