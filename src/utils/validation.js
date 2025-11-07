const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name fields are required.");
    }
    else if(validator.isEmail(emailId) === false){
        throw new Error("Email is not valid.");
    }
    else if(validator.isStrongPassword(password) === false){
        throw new Error(" Password is not strong enough. ");
    }
}

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed
}

module.exports = { validateSignUpData, validateProfileEditData}