const express = require('express');
const { connectDB } = require("./config/database");
const cors = require("cors")
const cookieParser = require('cookie-parser');

require('dotenv').config()

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestsRouter = require('./routes/requests');
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);


connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error("Database connection failed", err);
});
