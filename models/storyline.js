const mongoose = require('mongoose');
const { Schema } = mongoose;

const storylineSchema = new Schema({
    title: {
        tpye: String,
        required: true
    },
    authId: {
        type: String,
        required: false
    },
    episodes: {
        type: Array,
    },
    genre: {
        type: String,   
    },
    branches: {
        type: Array,
        required: false
    },
    comments: {
        type: Array,
        required: false
    },
    isOffering: {
        type: Boolean,
        default: false
    }
})

const Storyline = mongoose.model('Storyline', storylineSchema)
module.exports = Storyline;