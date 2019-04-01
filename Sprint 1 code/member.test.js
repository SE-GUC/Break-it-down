const funcs = require('./member');


test('Number of bookings of user with userID 505 should be 2', async () => {

  expect.assertions(1);

  const response =  await funcs.getRoomBookings();
  //console.log(response.data[0].RoomsBooked.length)
  expect(response.data[0].RoomsBooked.length).toBe(2);
 
});

test('"Delete Booking" function should return true if it successfully deleted the reservation and false if not', async () => {
  jest.setTimeout(30000);
  expect.assertions(1);
  const response =  await funcs.deleteRoomBooking();
  console.log(response);
  expect(response).toBeTruthy();

});


test('first item of all coworking spaces', async () => {
  expect.assertions(1);
  const response =  await funcs.getallcoworkingspace();
  expect(response.data.data[1].name).toEqual('Kotob Khan');
});

test('Name of of coworking spaces 7 should be Kotob Khan', async () => {
  expect.assertions(1);
  const response =  await funcs.getAcoworkingspace();
  console.log(response.data);
  expect(response.data.data[0].name).toEqual('Kotob Khan');
});

test('Number of bookings of user with id 5 should be 1', async (done) => {

  expect.assertions(1)

  const response =  await funcs.getBookings()
  console.log(response.data.data)
  expect(response.data.data.length).toBe(1)
  done()
});

test('Number of schedules of coworkingSpace with id 3 and room id 1 should be 1', async (done) => {

  expect.assertions(1)

  const r = await funcs.getRoomSchedule()
 // console.log(r.data)
  expect(r.data.data.length).toBe(1)
  done()
});

test('Room should be booked', async (done) => {
  expect.assertions(1)
  const response =  await funcs.bookRoom()
  console.log(response.data)
  expect(response.data.data).toBe(true)
  done()
});

test('delete the last entry',async (done)=>{
 // expect.assertions(1)
  const r =await funcs.deleteBookingtest()

 expect(r).toBe(true)
 console.log(r)
 done();
});

//const funcs = require('./events.js');

test("'Create an Member' should return true ",  async() => {
    expect.assertions(2);
    const response = await  funcs.createMember();
    console.log(response.data);
    expect(response).toBeTruthy();
    expect(response.data.data.name).toEqual("Malak Test")
    

  });

test("'Get all Members' should return true ", async () => {
    expect.assertions(1);
    const response =  await funcs.getAllMembers();
   // console.log(response.data);
    expect(response).toBeTruthy();   
    
  }); 

  test("'Get a Member' should return the test member ", async () => {
    expect.assertions(1);
    const response =  await funcs.getAnMember();
    //console.log(response.data)
    expect(response.data.email).toEqual("yasmin@email.com");
  });

test("'Update an Member' should return true if the member was updated ", async () => {
    expect.assertions(1);
    const response =  await funcs.updateMember();
    expect(response).toBeTruthy();

    
  });

  

  test("'Delete an Member' should return true confirming member was deleted", async () => {
    expect.assertions(1);
    const response =  await funcs.DeleteAnMember();
    expect(response).toBeTruthy();
    

  });

