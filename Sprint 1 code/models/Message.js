const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({

    name : {
        type: String,
        required: true
    },
  
    message : {
        type: String,
        required: true
    }
  
  })

  module.exports = Message = mongoose.model('messages', MessageSchema)