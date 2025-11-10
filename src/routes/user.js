const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");

// get all pending connection requests for the loggedInUser
userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequestModel.findOne({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"])

        res.json({message: "Data fetched Successfully",
            data : connectionRequests,
        });

    }catch(err){
        res.status(404).send("ERROR: " + err.message);
    }
})

module.exports = userRouter;

