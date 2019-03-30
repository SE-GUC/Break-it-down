
const funcs = require('./fn');
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

  

});

