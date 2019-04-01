const funcs = require('./profiles');

test("'create account member' should return true when a new member is added", async (done) => {
    jest.setTimeout(30000);
    expect.assertions(1);
    const response =  await funcs.createAccountMember();
    console.log(response);
    expect(response).toBeTruthy();
    done();
  });

  test("'create account partner' should return true when a new partenr is added", async (done) => {
    jest.setTimeout(30000);
    expect.assertions(1);
    const response =  await funcs.createAccountPartner();
    console.log(response);
    expect(response).toBeTruthy();
    done();
  });

  test("'create account coworking space' should return true when a new coworking space is added", async (done) => {
    jest.setTimeout(30000);
    expect.assertions(1);
    const response =  await funcs.createAccountCoworkingSpace();
    console.log(response);
    expect(response).toBeTruthy();
    done();
  });

  test("'create account educational organization' should return true when a new educational organization is added", async (done) => {
    jest.setTimeout(30000);
    expect.assertions(1);
    const response =  await funcs.createAccountEducationalOrganization();
    console.log(response);
    expect(response).toBeTruthy();
    done();
  });

  test("'create account consultancy agency' should return true when a new consultancy agency is added", async (done) => {
    jest.setTimeout(30000);
    expect.assertions(1);
    const response =  await funcs.createAccountConsultancyAgency();
    console.log(response);
    expect(response).toBeTruthy();
    done();
  });

  test("'create account admin' should return true when a new admin is added", async (done) => {
    jest.setTimeout(30000);
    expect.assertions(1);
    const response =  await funcs.createAccountAdmin();
    console.log(response);
    expect(response).toBeTruthy();
    done();
  });


  
  

 



