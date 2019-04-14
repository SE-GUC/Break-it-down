const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var connection=mongoose.createConnection("mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true")

// Create the schema
const messageSchema = new mongoose.Schema({
    name:String,
    chat:Array,
});

module.exports = messages2 = connection.model('messages2', messageSchema);