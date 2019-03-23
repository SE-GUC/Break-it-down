const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//to create an id that autoincrements each time a document is added
autoIncrement=require('mongoose-auto-increment');
var connection=mongoose.createConnection("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true", { useNewUrlParser: true })
autoIncrement.initialize(connection);
// Create the schema

const UserSchema = new Schema({
    //attributes that all users have in common
    type: {

        type: String,

        required: true

    },

    name: {

        type: String,

        required: true

    },

    password: {

        type: String,

        required: true

    },

    email: {

      type: String,

      required: true

  },
   phoneNumber: {

   type: Number,

   required: true

},
//attributes that not all users have 
field:{type:String,required: false},
memberTasks:{type:Array,required: false},
activation:{type:Boolean,required: false},
membershipExpiryDate:{type:Date,required: false},
address:{type:String,required: false},
birthday:{type:Date,required: false},
skills:{type:Array,required: false},
interests:{type:Array,required: false},
accomplishments:{type:Array,required: false},
trainers:{type:Array,required: false},
trainingPrograms:{type:Array,required: false},
partners:{type:Array,required: false},
boardMembers:{type:Array,required: false},
events:{type:Array,required: false},
reports:{type:Array,required: false},
tasks:{type:Array,required: false},
certificates:{type:Array,required: false},
website:{type:String,required: false},
description:{type:String,required: false},
facilities:{type:Array,required: false},
rooms:{type:Array,required: false},
updates:{type:Array,required: false}

});


UserSchema.plugin(autoIncrement.plugin,'users');
module.exports = User = connection.model('users', UserSchema);