const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    authId: {
        type: String,
        require: true,
    },
    postId: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        min: [1, 'Comments must contain between 1 and 1500 characters'],
        max: [1500, 'Comments must contain between 1 and 1500 characters']
    },
    votesUp: {
        type: Number,
        default: 0
    },
    votesDown: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;