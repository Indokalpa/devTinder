const express = require('express');

const app = express();

app.get("/user/:userId/:name", (req, res) => {
    console.log(req.params);
    res.send({firstName: "John", lastName: "Doe"});
});



app.listen(7000, () => {
    console.log('Server is running on port 7000');
});