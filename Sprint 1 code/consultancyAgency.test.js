const funcs = require('./consultancyAgency');

/* test('send a message to the admin', async () => {
  expect.assertions(1);
  const response =  await funcs.sendingMessageToAdmin('consult1','hi','consults@hotmail.com');
  console.log(response.data.name);
  expect(response.data.name).toEqual('consult1');
});
 */
test('first item of all coworking spaces', async () => {
    expect.assertions(1);
    const response =  await funcs.getallcoworkingspace();
    expect(response.data.data[1].name).toEqual('Fabulous Working Space');
  });
  
  test('Name of of coworking spaces 3 should be abcde', async () => {
   // expect.assertions(1);
    const response =  await funcs.getAcoworkingspace();
    console.log(response.data);
    expect(response.data.data[0].name).toEqual('abcde');
  });

  test('Number of bookings of user with id 2007 should be 1', async (done) => {

    expect.assertions(1)
  
    const response =  await funcs.getBookingsCA()
    //console.log(response.data)
    expect(response.data.data.length).toBe(1)
    done()
  });
  
  test('Number of schedules of coworkingSpace with id 300 and room id 1 should be 1', async (done) => {
  
    expect.assertions(1)
  
    const r = await funcs.getRoomScheduleCA()
   // console.log(r.data)
    expect(r.data.data.length).toBe(1)
    done()
  });
  
  test('Room should be booked', async (done) => {
    expect.assertions(1)
    const response =  await funcs.bookRoomCA()
    console.log(response.data)
    expect(response.data.data).toBe(true)
    done()
  });
  
  test('delete the last entry',async (done)=>{
   // expect.assertions(1)
    const r =await funcs.deleteBookingCA()
  
   expect(r).toBe(true)
   console.log(r)
   done();
  })




