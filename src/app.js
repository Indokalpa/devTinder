const express = require('express');
const { userAuth } = require('./middlewares/auth');
const { connectDB } = require("./config/database");
const { connect } = require('mongoose');
const { UserModel } = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req, res) => {
    try{
        // valdiation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;
        // Encrypt password
        const passwordHash = await bcrypt.hash(password, 10);
        

        // create a new instance of user model
        const user = new UserModel({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send("user Added Successfully");
    }catch(err){
        res.status(400).send("error signing up" + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const isValidEmail = validator.isEmail(emailId);
        if(!isValidEmail){
            throw new Error("Invalid email format");
        }

        const user = await UserModel.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid login credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            // create JWT token
            const token = user.getJWT();
            // Add the token to cookie and send it to the client
            res.cookie("token", token, {expires: new Date(Date.now() + 7*24*60*60*1000), httpOnly: true});
            res.send("login successful");
            
        }else{
            throw new Error("Invalid login credentials");
        }

    }catch(err) {
        res.status(400).send("error logging in : " + err.message);
    }
});

app.get("/profile", userAuth, async (req, res) => {
    try{
    const user = req.user;
    res.send(user);
    }catch(err){
        res.status(400).send("error fetching profile" + err.message);
    }
})

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    // sending connection request logic
    console.log("Connection request sent");
    res.send(user.firstName + " is sending a connection request ");
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
    console.log('Server is running on port 7777');
    });
}).catch((err) => {
    console.error("Database connection failed", err);
});