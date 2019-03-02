const uuid = require('uuid')

/*An educational organizationʼs profile should hold their basic information, 
the courses they offer, their trainers/educators, the certificates they supply and their training programs*/

class EducationalOrganisation{

    constructor(name, email, website, address, phoneNumber, fax, trainers, coursesOffered, certificatesSupplied, trainingPrograms){
        this.name= name;
        this.email= email;
        this.website= website;
        this.address= address;
        this.phoneNumber= phoneNumber;
        this.fax= fax;
        this.trainers= trainers;
        this.coursesOffered= coursesOffered;
        this.certificatesSupplied= certificatesSupplied;
        this.trainingPrograms= trainingPrograms;

        this.id= uuid.v4();

    };

};

module.exports= EducationalOrganisation