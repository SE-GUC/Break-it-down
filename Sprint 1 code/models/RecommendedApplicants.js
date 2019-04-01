const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RecommendedApplicantsSchema = new Schema({
taskID:{ 
    type: Number,
    required: true},

recommendedApplicants: {
    type: Array

}

})
module.exports = RecommendedApplicants = mongoose.model('recommendedAppl', RecommendedApplicantsSchema)