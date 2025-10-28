const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = (token === "xyz");

    console.log("Admin authorization middleware executed");
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
};

const userAuth = (req, res, next) => {
    const token = "xyz1";
    const isAdminAuthorized = (token === "xyz");

    console.log("User authorization middleware executed");
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
};




module.exports = { adminAuth, userAuth };