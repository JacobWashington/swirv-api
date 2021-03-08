const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
    userid: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;