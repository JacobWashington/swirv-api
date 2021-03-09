const mongoose = require('mongoose');
const { Schema } = mongoose;

const storylineSchema = new Schema({
    authId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: false
    },
    episodes: {
        type: Array,
    },
    genre: {
        type: String,   
    },
    branches: {
        type: Array,
        require: false
    },
    comments: {
        type: Array,
        require: false
    },
    isOffering: {
        type: Boolean,
        default: false
    }
})

const Storyline = mongoose.model('Storyline', storylineSchema)
module.exports = Storyline;