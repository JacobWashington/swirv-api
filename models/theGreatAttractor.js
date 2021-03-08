const mongoose = require('mongoose');
const { Schema } = mongoose;

const theGreatAttractorSchema = new Schema({
    id: Number,
    storylines: Array
})

const TheGreatAttractor = mongoose.model('TheGreatAttractor', theGreatAttractorSchema);

module.exports = TheGreatAttractor;