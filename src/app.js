const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require("./config/database");
const { connect } = require('mongoose');
const { UserModel } = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    try{
        // valdiation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId,password} = req.body;
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

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(isPasswordValid){
            res.send("Login successful");
        }else{
            throw new Error("Invalid login credentials");
        }

    }catch(err) {
        res.status(400).send("error logging in : " + err.message);
    }
});

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await UserModel.findOne({emailId: userEmail});
        if(!user){
            res.status(400).send("error fetching the user" + err.message);
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send("error fetching the user" + err.message);
    }
});

app.get("/feed", async (req, res) => {
    try{
        const users = await UserModel.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("error fetching the feed" + err.message);
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try{
        const user = await UserModel.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("error deleting the user" + err.message);
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    
    try{
        // api level validation
        const ALLOWED_UPDATES = ['phtooUrl', 'about',"gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((update) => 
        ALLOWED_UPDATES.includes(update)
        );
        if(!isUpdateAllowed){
            throw new Error("invalid updates! They are immutable fields.");
        }
        if(data?.skills.legth > 10){
            throw new Error("cannot add more than 10 skills");
        }

        await UserModel.findByIdAndUpdate(userId, data, 
            {runValidators: true}
        );
        res.send("user updated successfully");
    }catch(err){
        res.status(400).send("error updating the user" + err.message);
    }
})

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
    console.log('Server is running on port 7777');
    });
}).catch((err) => {
    console.error("Database connection failed", err);
});