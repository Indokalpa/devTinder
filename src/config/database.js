
const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect(
    "mongodb+srv://indokalpasaikia1_db_user:VOpLkgVcl9tn68h7@cluster0.owpmemy.mongodb.net/devTinder"
    );
};


module.exports = { connectDB };