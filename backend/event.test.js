
const funcs = require('./event');

test("'Create an Event' should return true ",  async() => {
    expect.assertions(2);
    const response = await  funcs.createEvent();
    console.log(response.data);
    expect(response).toBeTruthy();
    expect(response.data.name).toEqual("Malak Test")
    

  });

test("'Get all Events' should return true ", async () => {
    expect.assertions(1);
    const response =  await funcs.getAllEvents();
   // console.log(response.data);
    expect(response).toBeTruthy();   
    
  }); 

  test("'Get an Event' should return the test event ", async () => {
    expect.assertions(1);
    const response =  await funcs.getAnEvent();
    expect(response.data).toEqual({"_id": "5ca1440e1c9d440000684ff6", "coworkingspace": false, "date": "4/1/2019", "description": "I'm changing this", "location": "Home", "name": "Event Read Test"})
    
  });

test("'Update an Event' should return true if the event was updated and check its description ", async () => {
    expect.assertions(2);
    const response =  await funcs.updateEvent();
    expect(response).toBeTruthy();
    console.log(response.data.event)
    expect(response.data.event.description).toEqual("I'm changing this");

    
  });



  test("'Delete an Event' should return true confirming event was deleted", async () => {
    expect.assertions(1);
    const response =  await funcs.DeleteAnEvent();
    expect(response).toBeTruthy();
    

  });
