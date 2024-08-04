const jwt = require("jsonwebtoken")
const User = require("../models/user-model")

//next le router ko authc.user ko ma jancha
const authMiddleware = async (req,res,next) => {
    const token = req.cookies.token

    if (!token){
        return res.status(401).json({msg:"Unauthorized HTTP, user token not provided"})
    }

    // const jwtToken = token.replace("Bearer","").trim();
    // console.log("token:: ", jwtToken)

    try {

        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        //find the user w/o password who is verified (token) using its email 
        const userData = await User.findOne({ email: isVerified.email }).select({password:0})

        if(!userData){
            return res.status(400).json({msg:"User Not Found!"})
        }

        req.user = userData
        req.token = token
        req.userId = userData._id

        next();
        
    } catch (error) {
        res.status(401).json({msg:"Unauthorizzed. INvalid tokeeN"})
        
    }

}

module.exports = authMiddleware