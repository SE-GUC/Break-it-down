
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