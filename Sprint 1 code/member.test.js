
const funcs = require('./member');


//-----------------------------member getters test----------------------//

// test('get all approved tasks', async () => {

//   expect.assertions(1)
//   const response =  await funcs. getApprovedTasks();
//   //console.log(response.data[0].approved)
//   if(response.data.length===0){
//     expect(response.data.legnth).toBe(0)
//   }
//   else{expect(response.data[0].approved).toBe(true)}
  

// });

// test('get the recommended tasks based on my field', async () => {

//   expect.assertions(1)

//   const r = await funcs.getRecomendedTasks()
//   //console.log(r.data)
//   expect(typeof r.data).toBe('string');

// });


// test('member view his tasks', async () => {

//   expect.assertions(1)
//   const response =  await funcs. getMemTasks();
//   //console.log(response.data)
//   if(response.data.legnth===0){
//     expect(response.data.legnth.toBe(0))
//   }
//   else{expect(response.data.length).toBeGreaterThan(0)}
  

// });

// test('member gets his average rating', async () => {

//   expect.assertions(2)
//   const response =  await funcs.getMemAvgRating();
//   //console.log(response.data)
//   expect(response.data).toBeGreaterThanOrEqual(0);
//   expect(response.data).toBeLessThan(6);

// });

// //-------------------------member put method--------------------------//
// test('apply for a task', async () => {
//   expect.assertions(1)
//   const response =  await funcs.memberapply()
//   console.log(response.data)
//   expect(response.data.length).toBeGreaterThanOrEqual(1)
// });


//---------------------------------------nourhan---------------------------------------------------------------

//test the number of bookings made by member with userID 5
test('Number of bookings of user with id 5 should be 1', async (done) => {

  expect.assertions(1)

  const response =  await funcs.getBookings()
  console.log(response.data.data)
  expect(response.data.data.length).toBe(1)
  done()
});



//test the number of schedules that room with id 1 within coworking space with userID 3 is 1
test('Number of schedules of coworkingSpace with id 3 and room id 1 should be 1', async (done) => {

  expect.assertions(1)

  const r = await funcs.getRoomSchedule()
 // console.log(r.data)
  expect(r.data.data.length).toBe(1)
  done()
});

//test for booking a room schedule by member with userID 5
test('Room should be booked', async (done) => {
  expect.assertions(1)
  const response =  await funcs.bookRoom()
  console.log(response.data)
  expect(response.data.data).toBe(true)
  done()
});

//just to delete the booking made by the test
test('delete the last entry',async (done)=>{
 // expect.assertions(1)
  const r =await funcs.deleteBooking()

 expect(r).toBe(true)
 console.log(r)
 done();
})

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
