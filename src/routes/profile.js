const express = require('express');
const { userAuth } = require('../middlewares/auth');

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    try{
    const user = req.user;
    res.send(user);
    }catch(err){
        res.status(400).send("error fetching profile" + err.message);
    }
});


module.exports = profileRouter;