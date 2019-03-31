const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//to create an id that autoincrements each time a document is added
autoIncrement=require('mongoose-auto-increment');

var connection=mongoose.createConnection("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true");

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
memberTasks:{
    type:Array,
    required: false,
    "items":[{
       taskID:{
           type:Number
       },
       partnerID:{type:Number},
       accepted:{type:Boolean}

    } ]


},
avgRating:{type:Number,required:false},
allRatings:{
    type:Array,required:false
},

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
RoomsBooked:{type:Array,required: false},

tasks:{
    type:Array,
    required: false,
    "items":[
        {
        taskID:{
            type:Array,
            required:false,
            "items":[
                {
                taskID:{
                    type:Number
                }
                },{
                name:{
                    type:String,required:true
                }
                },{
         description:{type:String,required:true}
    },{
        wantsConsultant:{type:Boolean,required:true}
    },{
        field:{type:String,required:true}
    },{
        approved:{type:Boolean,}
    },{
        applicants:{
            type:Array,
            "items":[{
                applicantID:{type:Number,required:true} , 
                accepted:{type:Boolean,required:false},
                assigned:{type:Boolean,required:false}
            }]
            
          }
    },{
         lifeCycle:{
            type: Array,
            "items":{
                     type: Boolean
                    }
           }
    },{
        rate:{type:Number,required:false}
    },{
        review:{type:String,required:false}
    },{
        consultancies:{
            type:Array,
            "items":[{
                consultancyID:{type:Number},
                accepted:{type:Boolean},
                assigned:{type:Boolean}

            }]
        }
    },{
       assignee:{      //for the admin to use
           type:Number,required:false
       }
    },{
        consultancyAssignedID:{type:Number,required:false}
    }
        

]
        }
    },
    {
      skills:{
          type:Array
      }
    }
]

}
,

certificates:{type:Array,required: false},
website:{type:String,required: false},
description:{type:String,required: false},
facilities:{type:Array,required: false},
rooms:{type:Array,required: false},
updates:{type:Array,required: false}

});


UserSchema.plugin(autoIncrement.plugin,{ model: 'users', field: 'userID' });

module.exports = User = connection.model('users', UserSchema);
