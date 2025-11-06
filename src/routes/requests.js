const express = require('express');
const { userAuth } = require('../middlewares/auth');
const requestsRouter = express.Router();

requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    // sending connection request logic
    console.log("Connection request sent");
    res.send(user.firstName + " is sending a connection request ");
});

module.exports = requestsRouter;