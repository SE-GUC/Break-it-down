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
  const response =  await funcs.deleteBooking();
  console.log(response);
  expect(response).toBeTruthy();

});
