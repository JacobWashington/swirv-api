const mongoose = require('mongoose');
const { Schema } = mongoose;

const theGreatAttractorSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true, minLength: 8},
    date: {type: Date, default: Date.now()},     // mongoose doesn't generate createdDate like sequelize
    avatar: String,
    roles: Array,
    favorites: Array,
    readLater: Array,
    following: Array,
    followers: Array
})

const TheGreatAttractor = mongoose.model('TheGreatAttractor', theGreatAttractorSchema);

module.exports = TheGreatAttractor;