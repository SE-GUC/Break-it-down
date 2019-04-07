
const funcs = require('./educationalOrganization');

test("'Create an EducationalOrganization' should return true ",  async() => {
    expect.assertions(2);
    const response = await  funcs.createEducationalOrganization();
    console.log(response.data);
    expect(response).toBeTruthy();
    expect(response.data.data.name).toEqual("Nour Test Edu")
    

  });

test("'Get all EducationalOrganizations' should return true ", async () => {
    expect.assertions(1);
    const response =  await funcs.getAllEducationalOrganizations();
   // console.log(response.data);
    expect(response).toBeTruthy();   
    
  }); 

  test("'Get a EducationalOrganization' should return the test eduO ", async () => {
    expect.assertions(1);
    const response =  await funcs.getAnEducationalOrganization();
    //console.log(response.data)
    expect(response.data.email).toEqual("GInstitute@email.com");
  });

test("'Update an EducationalOrganization' should return true if the eduO was updated ", async () => {
    expect.assertions(1);
    const response =  await funcs.updateEducationalOrganization();
    expect(response).toBeTruthy();

    
  });

  

  test("'Delete an EducationalOrganization' should return true confirming eduO was deleted", async () => {
    expect.assertions(1);
    const response =  await funcs.DeleteAnEducationalOrganization();
    expect(response).toBeTruthy();
    

  });
