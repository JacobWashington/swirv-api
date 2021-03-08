const mongoose = require('mongoose');
const { Schema } = mongoose;

const storylineSchema = new Schema({
    authId: {
        type: Number,
        required: true
    },
    episodes: {
        type: Array,
        required: true
    },
    genre: {
        type: String,
        required: false        
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