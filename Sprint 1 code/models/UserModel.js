const uuid = require('uuid')

// The User Model
class User {
   constructor(name, age,email,SSN,phoneNumber,skills,interests,jobsCompleted,certificates) {
        this.name = name;
        this.age = age;
        this.email=email;
        this.phoneNumber=phoneNumber;
        this.id = uuid.v4();
    };


    /*for testing purposes
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.id = uuid.v4();
    };*/
};

module.exports = User