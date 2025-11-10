const express = require('express');
const { connectDB } = require("./config/database");
const { connect } = require('mongoose');

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser())

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestsRouter = require('./routes/requests');
const userRouter = require('./routes/user');

app.use("/", authRouter, profileRouter, requestsRouter, userRouter);


connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
    console.log('Server is running on port 7777');
    });
}).catch((err) => {
    console.error("Database connection failed", err);
});