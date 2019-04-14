
const funcs = require('./consultancyAgency');
const axios = require('axios');
//jest.mock('axios');
jest.setTimeout(30000);

describe("GET /recommended tasks/1", () => {
test("Gets the recommend tasks for a specific member. Gives tasks of the same field as the member", async () => {
    
    const member = axios.get('http://localhost:4000/api/member/viewMember/5')
    const tasks = axios.get('http://localhost:4000/api/consultancyAgency/filterTasks/5')
expect.assertions(tasks.length)
console.log(tasks)
for (var i = 0; i < tasks.length; i++) {
    expect(tasks[i].field === member.field).toBe(true)
}

//Ask why this code does not perform as the above used one
/*tasks.forEach(function(entry) {
            expect(entry.field===member.field).toBe(true)
});*/

});
});

describe("GET /recommended applicants/1", () => {
    test("Gets the recommend applicants for a specific partner's tasks. Gives members of the same field as the tasks", async () => {
       // jest.setTimeout(30000);
        const tasks = axios.get('http://localhost:4000/api/consultancyAgency/filterApplicants/77')
    const count =0
    console.log(tasks)
    for (var i = 0; i < tasks.length; i++) {
        const field = tasks[i].field
        for(var j = 0; j<tasks[j].applicants.length; j++){
        count++
        expect(field === tasks[i].applicants[j].field).toBe(true)
    }
}   expect.assertions(count)

    
    });
    });

//module.exports


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




