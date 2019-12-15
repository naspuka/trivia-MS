const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req,res,next) => {

        //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token foundreturn response (without going to the next middleware)
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try{
        //if can verify the token, set req.user and pass to the next middleware
        const decoded = jwt.verify(token, config.get("myPrivateKey"));
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        res.send(400).send("invalid token");
  
  }

};