const jwt = require('jsonwebtoken');

const JWT_SECRET = "UsersAuthenticationToken";

const fetchuser = (req,res,next) =>{
    const token = req.header("auth-token");

    if(!token){
        res.status(401).send("Please authenticate using valid token");
    }

    try {
        const data = jwt.verify(token,JWT_SECRET);

        req.user = data.user;
        next();
    } catch (error) {
        res.status(500).send("Internal server error");
    }

    
    

}

module.exports = fetchuser;