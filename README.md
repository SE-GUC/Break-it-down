# Break-it-down
//consultancy agency
const uuid = require('uuid')


class ConsultancyAgency{

    constructor(name, email, website, address, phoneNumber, fax, boardMembers, studiesPosted, eventsOrganized, about, socialMediaAccounts){
        this.name= name;
        this.email= email;
        this.website= website;
        this.address= address;
        this.phoneNumber= phoneNumber;
        this.fax= fax;
        this.boardMembers= boardMembers;
        this.studiesPosted= studiesPosted;
        this.eventsOrganized= eventsOrganized;

        this.about= about;
        this.socialMediaAccounts= socialMediaAccounts;

        this.id= uuid.v4();

    };

};

module.exports= ConsultancyAgency
//MEMBER
const uuid= require('uuid')

class Member {
    constructor(name, age, email, SSN, phoneNumber, skills, interests, jobsCompleted, certificates){
        this.name= name;
        this.age= age;
        this.email= email;
        this.SSN= SSN;
        this.phoneNumber= phoneNumber;
        this.skills= skills;
        this.interests= interests;
        this.jobsCompleted= jobsCompleted;
        this.certificates= certificates;
        
        this.id = uuid.v4();

    };
};

module.exports= Member
//PARTNER
const uuid = require('uuid')

class Partner{

    constructor(name, email, address, website, fax, phoneNumber, partners, boardMembers, about, socialMediaAccounts){
        this.name= name;
        this.email= email;
        this.address= address;
        this.website= website;
        this.fax= fax;
        this.phoneNumber= phoneNumber;
        this.partners= partners;
        this.boardMembers= boardMembers;

        this.about= about;
        this.socialMediaAccounts= socialMediaAccounts;

        this.id= uuid.v4();

    }; 

};

module.exports= Partner
//PARTNER COWORKING SPACE
const uuid = require('uuid')

class PartnerCoworkingSpace{
    constructor (name, email, address, website, fax, phoneNumber, facilities, rooms, reservationsAvailability, about, socialMediaAccounts){

        this.name= name;
        this.email= email;
        this.address= address;
        this.website= website;
        this.fax= fax;
        this.phoneNumber= phoneNumber;

        this.facilities= facilities;

     // this.rooms= rooms;
     
        this.room1= room1;
        this.room2= room2;
        this.room3= room3;



        this.reservationsAvailability= reservationsAvailability;

        this.about= about;
        this.socialMediaAccounts= socialMediaAccounts;

        this.id= uuid.v4();

    };
} ;


module.exports= ParnerCoworkingSpace
