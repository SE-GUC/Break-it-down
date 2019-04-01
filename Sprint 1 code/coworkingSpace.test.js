const funcs = require('./coworkingSpace.funcs');
const axios = require('axios');
const mongoose = require('mongoose')
//jest.mock('axios');
require('dotenv').config()


describe("DELETE /rooms/1", () => {
test("It responds with a message of Deleted", async () => {
const resBefore = await axios.get('http://localhost:4000/api/coworkingSpace/viewCospace/9');
const newRoom = axios.post(
"http://localhost:4000/api/coworkingSpace/createRoom/9", {
id: 101,
capacity: 160,
schedule: [{id: 1, reserved: false, Date: 6/6/2019, time: 9}]
})
expect.assertions(3)
const removedRoom = await axios.delete(
'http://localhost:4000/api/coworkingSpace/deleteRoom/9/101'
);
expect(removedRoom.data).toEqual({ msg: "Deleted" });
expect(removedRoom.status).toBe(200);
// make sure we still have all its rooms
const response = await axios.get('http://localhost:4000/api/coworkingSpace/viewCospace/9');
expect(response.data.rooms.length===resBefore.data.rooms.length).toBe(true);
// console.log(response.data.rooms.length)
// console.log(resBefore.data.rooms.length)
});
});


describe("DELETE /schedule/1", () => {
test("It responds with a message of Deleted upon deleting schedule", async () => {
const resBefore = await axios.get('http://localhost:4000/api/coworkingSpace/viewRoomSchedule/7/4');
const newSchedule = axios.post(
"http://localhost:4000/api/coworkingSpace/createSchedule/7/4", 
    {"id": 18, "Date":"6/6/2019", "time": 9}
    )
expect.assertions(3)
const removedSchedule = await axios.delete(
'http://localhost:4000/api/coworkingSpace/deleteSchedule/7/4/18'
);
expect(removedSchedule.data).toEqual({ msg: "Deleted" });
expect(removedSchedule.status).toBe(200);
// make sure we still have all its rooms
const response = await axios.get('http://localhost:4000/api/coworkingSpace/viewRoomSchedule/7/4');
console.log(response.data)
console.log(resBefore.data)
expect(response.data[0].rooms.schedule.length===resBefore.data[0].rooms.schedule.length).toBe(true);
// console.log(response.data)
});
});


test('Cospace fetched should have id 9', async (done) => { //passed
const response =  await funcs.getCospace()
expect.assertions(7)
//console.log(response.data)
expect(response.data).toHaveProperty('userID');
expect(typeof response.data.userID === 'number').toBe(true)
expect(typeof response.data === typeof {}).toBe(true)
expect(response.data.userID).toBe(9)
expect(response.data).toHaveProperty('facilities');
expect(response.data).toHaveProperty('rooms');
expect(response.data.type).toBe('coworkingSpace')
done()
});

test('Rooms returned should be an array', async (done) => { //passed
const response =  await funcs.getCospaceRoom()
expect.assertions(3)
//console.log(response.data)
expect(response.data[0].rooms.id).toBe(1)
expect(typeof response.data[0].rooms.id === 'number').toBe(true)
expect(Array.isArray(response.data)).toBe(true);
done()
});

test('Objects of type coworking space are fetched', async (done) => { //passed
const response =  await funcs.getAllCospaces()
expect.assertions(6)
//console.log(response.data)
expect(response.data.data[0]).toHaveProperty('userID');
expect(typeof response.data.data[0].userID === 'number').toBe(true)
expect(response.data.data[0]).toHaveProperty('facilities');
expect(response.data.data[0]).toHaveProperty('rooms');
//expect(typeof response.data.data[0].facilities === typeof []).toBe(true)
expect(response.data.data[0].type).toBe('coworkingSpace')
expect(Array.isArray(response.data.data)).toBe(true);
done()
});


test('As a coworking space, I can updated my profile. A coworkin space object with name Supernova is fetched',
async (done) =>{ //passes
expect.assertions(2)
const cospace = await funcs.updateCospace()
//console.log(cospace.data)
expect(cospace.data.name).toBe('Supernova')
expect(Array.isArray(cospace.data)).toBe(false);
done()
})

test('Room creation. A room of id 2 and capacity 160 is returned',
async (done) =>{ //passes
expect.assertions(8)
const response = await funcs.createRoom()
//console.log(response.data)
expect(response.data[0].rooms).toHaveProperty('id');
expect(response.data[0].rooms.id).toBe(2);
expect(response.data[0].rooms.capacity).toBe(160);
expect(typeof response.data[0].rooms.id === 'number').toBe(true)
expect(response.data[0].rooms).toHaveProperty('schedule');
expect(response.data[0].rooms).toHaveProperty('capacity');
expect(Array.isArray(response.data)).toBe(true);
expect(Array.isArray(response.data[0].rooms.schedule)).toBe(true);
done()
})




test('Schedule creation.', async (done) =>{ //passes
expect.assertions(5)
const response = await funcs.createRoomSchedule()
//console.log(response.data[0])
expect(Array.isArray(response.data)).toBe(true);
expect(response.data[0].rooms).toHaveProperty('schedule');
expect(Array.isArray(response.data[0].rooms.schedule)).toBe(true);
expect(response.data[0].rooms.schedule[0]).toHaveProperty('id');
expect(typeof response.data[0].rooms.schedule[0].id === 'number').toBe(true);
done()
})


test('Testing view schedule for a room. An array of schedule objects should be returned', async (done) => { //passed
    const response =  await funcs.getSchedule()
    expect.assertions(4)
    console.log(response.data)
    expect(Array.isArray(response.data)).toBe(true);
    expect(Array.isArray(response.data[0].rooms.schedule)).toBe(true);
    //to verify that schedule array of the room is returned not the whole room
    expect(response.data[0].rooms).not.toHaveProperty('id');
    expect(response.data[0].rooms).not.toHaveProperty('capacity');
    done()
    });

	
test('No room suggestions found, returns 404', async (done) => {

    expect.assertions(1)
 try{
    const response =  await funcs.viewCoworkingspaceSuggestions(1)
  }catch(e){
    expect(e.message).toEqual('No room suggestions found')

  } 
    done()
  });

  test('Coworkingspace suggestions is a defined array of objects and contains the specified records', async (done) => {
    expect.assertions(5)

      const response =  await funcs.viewCoworkingspaceSuggestions(2)
      expect(response).toBeDefined();
      expect(response).not.toBeNull();
      expect(response).toBeInstanceOf(Array)

      expect(response).toEqual(expect.arrayContaining([expect.objectContaining (
        {_id: '5c940f161c9d44000091e226', name: 'Supernova' })]));

      expect(response[0].facilities).toEqual(expect.arrayContaining(['WiFi', 'Hot drinks and snacks']) )

 done()
  });
  
  
  test('Booking not found, returns 404', async (done) => {

  expect.assertions(1)
try{
    const response =  await funcs.updateRoomBooking(1000)
}catch(e){
  expect(e.message).toEqual('Could not find an empty room with the desired capacity in the same coworking space')

} 
  done()
});

test('Room Booking updated', async (done) => {
  expect.assertions(1)

    const response =  await funcs.updateRoomBooking(3)
    
    expect(response.msg).toEqual('Your room booking is successfully updated.');

done()
});

test('first item of all coworking spaces', async () => {
  expect.assertions(1);
  const response =  await funcs.getallcoworkingspace();
  expect(response.data.data[1].name).toEqual('Kotob Khan');
});

test('Name of of coworking spaces 9 should be Supernova', async () => {
  expect.assertions(1);
  const response =  await funcs.getAcoworkingspace();
  console.log(response.data);
  expect(response.data.data[0].name).toEqual('Supernova');
});


