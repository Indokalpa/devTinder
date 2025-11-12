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

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequestModel.find({
            $or : [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId", "firstName lastName photoUrl age gender about skills")
        .populate("toUserId", "firstName lastName photoUrl age gender about skills");

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        });

        res.json({ data });

    } catch (err){
        res.status(400).send({message: err.message});
    }
})

module.exports = userRouter;

