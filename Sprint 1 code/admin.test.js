const funcs = require('./fn');
//-----------------------------admin------------------------//
test('admin assigning the chosen member by partner', async () => {
  expect.assertions(1)
  const response =  await funcs.AssignApplicant()
  //console.log(response.data)
  if(typeof response.data==="string"){
    expect(response.data).toContain("the")
  }
  //console.log(response.data)
  else{
    expect(response.data.assigned).toBe(true)
  }
});

test('admin assigning the chosen consultancy agency by partner', async () => {
  expect.assertions(1)
  const response =  await funcs.AssignConsultancy()
  //console.log(response.data)
  if(typeof response.data==="string"){
    expect(response.data).toContain("the")
  }
  //console.log(response.data)
  else{
    expect(response.data.assigned).toBe(true)
  }
});

test('admin assigning the chosen consultancy agency by partner', async () => {
  expect.assertions(1)
  const response =  await funcs.AssignConsultancy()
  //console.log(response.data)
  if(typeof response.data==="string"){
    expect(response.data).toContain("the")
  }
  //console.log(response.data)
  else{
    expect(response.data.assigned).toBe(true)
  }
});


//-------------------------------------admin tests--------------------------------------------//

test('check description', async () => {
  expect.assertions(1)
  const response =  await funcs.adminCheckTaskDescription()

  expect(response.data.length).not.toBe(0)

});


test('admin approve tasks', async () => {
 expect.assertions(1)
 const response =  await funcs.adminApproveTask()
 expect(response.data.approved).toBeTruthy()

});


test('account should be activated', async () => {
 expect.assertions(1)
 const response =  await funcs.adminActivateAccount()
// console.log(response.data)
 expect(response.data.activation).toBe(true)
});
