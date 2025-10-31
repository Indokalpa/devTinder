const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const { connectDB } = require("./config/database");
const { connect } = require('mongoose');
const { UserModel } = require('./models/user');

const app = express();

// will work for all routes
app.use(express.json());

// POST /signup - add a new user to the database
app.post("/signup", async (req, res) => {

    const user = new UserModel(req.body);
    try{
        await user.save();
        res.send("user Added Successfully");
    }catch(err){
        res.status(400).send("error saving the message" + err.message);
    }
});

// GET /user - get user info by email
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

// GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try{
        const users = await UserModel.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("error fetching the feed" + err.message);
    }
});

// DELETE /user - delete a user from the database by userId
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try{
        const user = await UserModel.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("error deleting the user" + err.message);
    }
});

// PATCH /user - update data of a user by userId
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