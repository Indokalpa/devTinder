const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');

const app = express();

app.get("/getUserData", (req, res) => {
    try{
        // Logic of DB call and get user data
        throw new Error("DB connection failed");
        res.send("User data sent");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("Internal Server Error");
    }
});


app.listen(7777, () => {
    console.log('Server is running on port 7777');
});