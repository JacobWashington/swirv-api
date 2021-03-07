const mongoose = require('mongoose');
const { Schema } = mongoose;

const episodeSchema = new Schema({
authId: {
    type: Number,
    require: true,
},
storyLineId: {
    type: Number,
    require: true
},
branchId: Number,
title: {
    type: String,
    require: true,
    min: 1,
    max: 200,
},
content: {
    type: String,
    require: true,
    min: [10, 'Episode must contain between 10 and 23,500 characters'],
    max: [23500, 'Episode must contain between 10 and 23, 500 characters'],
},
isOffering: {
    type: Boolean,
    default: false,
},
created: {
    type: Date,
    default: Date.now(),
},
updated: {
    type: Date,
    default: Date.now()
}
})

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;