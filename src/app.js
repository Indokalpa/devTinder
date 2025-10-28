const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');

const app = express();


// Handle auth middleware for all GET, POST, PUT,... requests
app.use("/admin", adminAuth);
app.get("/user", userAuth, (req, res) => {
    res.send("User Data is sent");
});

app.get("/user", (req, res) => {
    res.send("User Data is sent");
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All Data is sent");
})

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
})



app.listen(7777, () => {
    console.log('Server is running on port 7777');
});