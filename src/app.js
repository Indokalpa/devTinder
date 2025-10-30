const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require("./config/database");
const { connect } = require('mongoose');
const { UserModel } = require('./models/user');

const app = express();

// will work for all routes
app.use(express.json());

app.post("/signup", async (req, res) => {

    const user = new UserModel(req.body);
    try{
        await user.save();
        res.send("user Added Successfully");
    }catch(err){
        res.status(400).send("error saving the message" + err.message);
    }
});

// Get user by email
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
})

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try{
        const users = await UserModel.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("error fetching the feed" + err.message);
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