const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    res.send({firstName: "John", lastName: "Doe"});
})

app.post("/user", (req, res) => {
    res.send("Data successfully received!");
})

app.delete("/user", (req, res) => {
    res.send("User deleted successfully!");
})

app.use("/test", (req, res) => {
    res.send("Hello, from server!");
})


app.listen(7000, () => {
    console.log('Server is running on port 7000');
});