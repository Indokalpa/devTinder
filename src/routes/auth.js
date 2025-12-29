const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const { UserModel } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // valdiation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt password
    const passwordHash = await bcrypt.hash(password, 10);

    // create a new instance of user model
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    // create JWT token
    const token = user.getJWT();
    // Add the token to cookie and send it to the client
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 60 * 60 *1000),
      httpOnly: true,
    });
    res.json({ message: "User signed up successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("error signing up" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  console.log("POST /login body:", req.body);
  try {
    const { emailId, password } = req.body;

    const isValidEmail = validator.isEmail(emailId);
    if (!isValidEmail) {
      throw new Error("Invalid email format");
    }

    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid login credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create JWT token
      const token = user.getJWT();
      // Add the token to cookie and send it to the client
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
        httpOnly: true,
      });
      res.send(user);
    } else {
      throw new Error("Invalid login credentials");
    }
  } catch (err) {
    res.status(400).send("error logging in : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  // clear the token cookie
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("logout successful");
});

module.exports = authRouter;
