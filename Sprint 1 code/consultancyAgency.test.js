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




