const uuid = require('uuid')

// The Event Model
class Event {
    
    constructor(name,description, date,location) {
        this.name = name;
        this.description =description;
        this.date = date;
        this.location=location;
        this.coworkingspace=false;
        this.id = uuid.v4();
    };
};

module.exports = Event