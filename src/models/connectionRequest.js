const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is not a valid status`
        },
    }
}, { timestamps: true });

// compound indexing
connectionRequestSchema.index({
    fromUserId: 1, 
    toUserId: 1
})

// will be called everytime before 'save'
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    // check if fromUserId === toUsserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection Request to Yourself !!")
    }

    next();
})

const connectionRequestModel = new mongoose.model('connectionRequest', connectionRequestSchema);

module.exports = connectionRequestModel;