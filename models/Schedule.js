const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//to create an id that autoincrements each time a document is added
autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection(
  "mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true"
);
autoIncrement.initialize(connection);

// Create the schema
const ScheduleSchema = new Schema({
  id: Number,
  Date: Date,
  time: Number,
  endTime:Number,
  reserved: Boolean,
  scheduleNumber: Number
});

module.exports = Schedule = mongoose.model("schedules", ScheduleSchema);
