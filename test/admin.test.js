const funcs = require('./admin');
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

test('first message should be from alia',async ()=>{
  expect.assertions(1)
  const response =  await funcs.viewconsultancyagencymessages()
 console.log(response.data)
  expect(response.data.data[0].name).toBe('alia')
})


test('No updates found, returns 404', async (done) => {

    expect.assertions(1)
 try{
      const response =  await funcs.viewUpdatesByAdmin()
  }catch(e){
    expect(e.message).toEqual('No updates found')

  } 
    done()
  });

  test('Updates is a defined array of objects and contains the specified records', async (done) => {
    expect.assertions(5)

      const response =  await funcs.viewUpdatesByAdmin()
      expect(response).toBeDefined();
      expect(response).not.toBeNull();
      expect(response).toBeInstanceOf(Array)
    
      expect(response).toEqual(expect.arrayContaining([expect.objectContaining ({_id: '5c9114781c9d440000a926ce'})]));

      expect(response[1].updates).toEqual(expect.arrayContaining([expect.objectContaining(
      {id: 1, TaskID: 2, description: 'helloooooo', status: 'pending'})]) )

 done()
  });
  
  
  test('Admin approves updates by deleting entry from updates array', async (done) => {
    expect.assertions(1)

      const view=await funcs.viewUpdatesByAdmin()
      const before=view[4].updates[2]
      const response =  await funcs.approveUpdatesByAdmin('5ca011331c9d4400009a80d2',2)
      const after=view[4].updates[2]
      expect(after).not.toBeDefined();

 done()
  },50000);

  test('User not found, returns 404', async (done) => {

    expect.assertions(1)
 try{
      const response =  await funcs.approveUpdatesByAdmin(1000,3)
  }catch(e){
    expect(e.message).toEqual('User does not exist')

  } 
    done()
  });

  test('Update not found, returns 404', async (done) => {

    expect.assertions(1)
 try{
      const response =  await funcs.approveUpdatesByAdmin('5ca011331c9d4400009a80d2',1000)
  }catch(e){
    expect(e.message).toEqual('Update does not exist')

  } 
    done()
  });

  test('Admin disapproves updates by deleting entry from updates array', async (done) => {
    expect.assertions(1)

      const view=await funcs.viewUpdatesByAdmin()
      const before=view[4].updates[2]
      const response =  await funcs.disapproveUpdatesByAdmin('5ca011331c9d4400009a80d2',2)
      const after=view[4].updates[2]
      expect(after).not.toBeDefined();

 done()
  },50000);

  test('User not found, returns 404', async (done) => {

    expect.assertions(1)
 try{
      const response =  await funcs.disapproveUpdatesByAdmin(1000,3)
  }catch(e){
    expect(e.message).toEqual('User does not exist')

  } 
    done()
  });

  test('Update not found, returns 404', async (done) => {

    expect.assertions(1)
 try{
      const response =  await funcs.disapproveUpdatesByAdmin('5ca011331c9d4400009a80d2',1000)
  }catch(e){
    expect(e.message).toEqual('Update does not exist')

  } 
    done()
  });






