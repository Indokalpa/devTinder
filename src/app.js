const express = require('express');

const app = express();

app.use("/user", [(req, res, next) => {
    // Route handler
    next();
}, 
(req, res) => {
    res.send("route Handler 2");
}],

(req, res) => {
    res.send("route Handler 3");
}
);



app.listen(7777, () => {
    console.log('Server is running on port 7777');
});