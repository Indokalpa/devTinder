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
        throw new Error("Password is not strong enough.");
    }
}

module.exports = { validateSignUpData}