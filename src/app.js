const express = require('express');

const app = express();

app.use("/test", (req, res) => {
    res.send("Hello, World!");
})

app.use("/hello", (req, res) => {
    res.send("Hello Ji!");
})

app.use( (req, res) => {
    res.send("Hello Ji! from dashboard");
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});