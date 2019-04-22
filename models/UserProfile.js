const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//to create an id that autoincrements each time a document is added

autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(
  "mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true"
);

autoIncrement.initialize(connection);

// Create the schema

const UserSchema = new Schema({
  //attributes that all users have in common
  // _id: mongoose.Schema.Types.ObjectId,

  type: { type: String, required: true },

  name: { type: String, required: true },

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

  field: { type: String, required: false },

  memberTasks: {
    type: Array,
    required: false,
    items: [
      {
        taskID: {
          type: Number
        },
        partnerID: { type: Number },
        accepted: { type: Boolean }
      }
    ]
  },

  avgRating: { type: Number, required: false },

  allRatings: {
    type: Array,
    required: false
  },

  activation: { type: Boolean, required: false },
  notifications: {
    type: Array,
    items: [
      {
        notificationContent: { type: String, required: true },
        read: { type: Boolean, required: false },
        notifID: { type: Number, required: false }
      }
    ]
  },

  membershipExpiryDate: { type: Date, required: false },

  address: { type: String, required: false },

  birthday: { type: Date, required: false },

  skills: { type: Array, required: false },

  interests: { type: Array, required: false },

  accomplishments: { type: Array, required: false },

  trainers: { type: Array, required: false },

  trainingPrograms: { type: Array, required: false },

  partners: { type: Array, required: false },

  boardMembers: { type: Array, required: false },

  events: { type: Array, required: false },

  reports: { type: Array, required: false },

  RoomsBooked: {
    type: Array,
    required: false,
    items: [
      {
        bookingID: { type: Number, required: true },
        coworkingSpaceID: { type: Number, required: true },
        roomID: { type: Number, required: true },
        scheduleID: { type: Number, required: true },
        Date: { type: Date, required: true },
        time: { type: Number, required: true }
      }
    ]
  },
  tasks: {
    type: Array,
    items: {
      type: "object",
      properties: {
        taskID: {
          type: Number
        },
        name: {
          type: String
        },
        description: {
          type: String
        },
        lirtenHubVerified: {
          type: Boolean
        },
        wantsConsultant: {
          type: Boolean
        },
        field: {
          type: String
        },
        approved: {
          type: Boolean
        },
        applicants: {
          type: Array,
          items: {
            type: "object",
            properties: {
              applicantID: { type: Number },
              accepted: { type: Boolean },
              assigned: { type: Boolean }
            }
          }
        },
        lifeCycle: {
          type: Array,
          items: { type: Boolean }
        },
        rate: { type: Number },
        review: { type: String },
        consultancies: {
          type: Array,
          items: {
            type: "object",
            properties: {
              consultancyID: { type: Number },
              accepted: { type: Boolean },
              assigned: { type: Boolean }
            }
          }
        },
        assignee: { type: Number },
        skills: { type: Array },
        consultancyAssignedID: { type: Number, required: false }
      }
    }
  },

  certificates: { type: Array, required: false },

  website: { type: String, required: false },

  description: { type: String, required: false },

  facilities: { type: Array, required: false },

  rooms: {
    type: Array,
    required: false,
    items: [
      {
        id: { type: Number, required: true },
        capacity: { type: Number },
        schedule: {
          type: Array,
          required: false,
          items: [
            {
              id: { type: Number, required: true },
              reserved: { type: Boolean, required: false },
              reservedBy: { type: Number, required: false },
              Date: { type: Date, required: false },
              time: { type: Number, required: false }
            }
          ]
        }
      }
    ]
  },

  updates: {
    type: Array,
    required: false,
    items: [
      {
        _id: { type: Number, required: true },
        type: { type: String, required: false },
        name: { type: String, required: false },
        password: { type: String, required: false },
        email: { type: String, required: false },
        phoneNumber: { type: Number, required: false },
        field: { type: String, required: false },
        memberTasks: {
          type: Array,
          required: false,

          items: [
            {
              accepted: { type: Boolean }
            }
          ]
        }
      }
    ]
  },
  notifications: {
    type: Array,
    items: [
      {
        notificationContent: { type: String, required: true },
        read: { type: Boolean, required: false },
        unread: { type: Boolean, required: false },
        notifID: { type: Number, required: false }
      }
    ]
  },
  consultancyTasks: {
    type: Array,
    required: false,
    items: [
      {
        taskID: {
          type: Number
        },
        partnerID: { type: Number },
        accepted: { type: Boolean }
      }
    ]
  }
});

UserSchema.plugin(autoIncrement.plugin, { model: "users", field: "userID" });

module.exports = User = connection.model("users", UserSchema);
