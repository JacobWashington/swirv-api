const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true, minLength: 8},
    date: {type: Date, default: Date.now()},
    avatar: {type: String, default:'https://res.cloudinary.com/y4050/image/upload/v1614149329/mjd9sb12ihdfwvmzqzes.png'},
    roles: {type: Array, default: 'Reader'},
    bios: {type: String},
    favorites: {type: Array},
    readLater: {type: Array},
    following: {type: Array},
    followers: {type: Array}
})

const User = mongoose.model('User', userSchema);

module.exports = User;