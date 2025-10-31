const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(["male", "female", "others"].includes(value) === false) {
                throw new Error("Gender data is not valid.");}
        }
    },
    photoUrl: {
        type: String,
        default: "https://assets.leetcode.com/users/IndoKalpa/avatar_1712646550.png"
    },
    about: {
        type: String,
        default: "This is default about me section."
    },
    skills: {
        type: [String],
    },
}, {timestamps: true});

const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel };