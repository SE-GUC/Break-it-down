const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cospaceSchema = new Schema({

    id2 : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    rooms :{
        type : Object,
        required : true
    }
  
  })

  module.exports = PartnerCoworkingSpace = mongoose.model('partnercoworkingspaces', cospaceSchema)