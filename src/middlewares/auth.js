const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

const userAuth = async (req, res, next) => {
    // read the token from the req cookies
    // validate the token, and find the username
    try{
    const { token } = req.cookies;
    if(!token){
        return res.status(401).send("Please Login!")
    }

    const decodedObj = await jwt.verify(token, "secret");
    const { _id } = decodedObj;
    const user = await UserModel.findById(_id);
    if(!user){
        throw new Error("User not found");
    }

    // attach the user to the req object
    req.user = user;
    next();

    }catch(err){
        return res.status(400).send("ERROR: " + err.message);
    }

};



module.exports = { userAuth };