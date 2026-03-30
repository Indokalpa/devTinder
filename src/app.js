const express = require('express');
const { connectDB } = require("./config/database");
const cors = require("cors")
const cookieParser = require('cookie-parser');

require('dotenv').config()

const app = express();

const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  })
);

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
