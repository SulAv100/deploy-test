const jwt = require("jsonwebtoken")
const User = require("../models/user-model")


const adminMiddleware = async (req,res, next) => {
    const adminToken = req.cookies.adminToken
    
    if (!adminToken){
        return res.status(401).json({msg:"Unauthorized HTTP, admin token not provided"})
    }
    
    try {
        
        const isVerified = jwt.verify(adminToken, process.env.JWT_SECRET_KEY)
        // return res.json(adminToken)
        
        //find the user w/o password who is verified (token) using its email 
        const userData = await User.findOne({ email: isVerified.email })

        if(!userData){
            res.status(400).json({msg:"Admin Not Found!"})
        }

        req.user = userData

        next();
        
    } catch (error) {

        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ msg: "Unauthorized. Invalid Token" });
        } else {
            // Handle other potential errors
            res.status(401).json({msg:"l. INvalid tokeeN"})
        }
        
    }
}

module.exports = adminMiddleware