
const funcs = require('./fn');


//-----------------------------member getters test----------------------//

test('get all approved tasks', async () => {

  expect.assertions(1)
  const response =  await funcs. getApprovedTasks();
  //console.log(response.data[0].approved)
  if(response.data.length===0){
    expect(response.data.legnth).toBe(0)
  }
  else{expect(response.data[0].approved).toBe(true)}
  

});

test('get the recommended tasks based on my field', async () => {

  expect.assertions(1)

  const r = await funcs.getRecomendedTasks()
  //console.log(r.data)
  expect(typeof r.data).toBe('string');

});


test('member view his tasks', async () => {

  expect.assertions(1)
  const response =  await funcs. getMemTasks();
  //console.log(response.data)
  if(response.data.legnth===0){
    expect(response.data.legnth.toBe(0))
  }
  else{expect(response.data.length).toBeGreaterThan(0)}
  

});

test('member gets his average rating', async () => {

  expect.assertions(2)
  const response =  await funcs.getMemAvgRating();
  //console.log(response.data)
  expect(response.data).toBeGreaterThanOrEqual(0);
  expect(response.data).toBeLessThan(6);

});

//-------------------------member put method--------------------------//
test('apply for a task', async () => {
  expect.assertions(1)
  const response =  await funcs.memberapply()
  console.log(response.data)
  expect(response.data.length).toBeGreaterThanOrEqual(1)
});


