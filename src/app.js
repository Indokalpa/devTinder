const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require("./config/database");
const { connect } = require('mongoose');
const { UserModel } = require('./models/user');

const app = express();

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Virat",
        lastName: "Kohli",
        emailId: "viratkohli@gmail.com",
        password: "password123",
    }
    // creating a new user document
    const user = new UserModel(userObj);
    try{
        await user.save();
        res.send("user Added Successfully");
    }catch(err){
        res.status(400).send("error saving the message" + err.message);
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