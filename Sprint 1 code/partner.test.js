
const funcs = require('./fn');
//------------partner getter test------------------//
test('Partner view applicants for a task', async () => {

  expect.assertions(1)
  const response =  await funcs.getPartnerTasks();
  //console.log(response.data.task)
  expect(typeof response.data.task).toBe('object')

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

