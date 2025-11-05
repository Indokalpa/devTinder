const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }
        }
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
        default: "https://assets.leetcode.com/users/IndoKalpa/avatar_1712646550.png",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid.");
            }
        }
    },
    about: {
        type: String,
        default: "This is default about me section."
    },
    skills: {
        type: [String],
    },
}, {timestamps: true});

userSchema.methods.getJWT = function() {
    const user = this;

    const token = jwt.sign({_id: user._id}, "secret", {expiresIn: "7d"});
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel };