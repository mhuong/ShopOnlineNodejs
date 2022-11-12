const mongoose = require('mongoose')
const Schema = mongoose.Schema
const courses = require('./Course')
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: false
    },
    lastName: {
        type: String,
        require: false
    },
    description: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
    },
    verify_token: {
        type: String,
        required: false
    },
    auth: {
        type: Boolean,
        required: true,
        default: false
    },
    courses: [{
        type: ObjectId,
        ref: 'courses',
        required: false
    }],
    role: {
        type: Number,
        default: 0,
        required: true
    }
})



const User = mongoose.model('users', userSchema);
module.exports = User;
