const User = require("../models/user-model")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

const { sendResetMail } = require("../utils/sendEmail")

const home = async (req, res) => {
    try {
        console.log(req.body)
        res.status(200).json({msg:req.body});

    } catch (error) {
        console.log(error)

    }
}
// REGISTER LOGIC

const register = async (req, res) => {
    try {

        // GET DATA
        console.log(req.body);
        const {username, email, password, package} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const mailExists = await User.findOne({email});
        const usernameExists = await User.findOne({username});

        // COMPARE DATA
        if (usernameExists && mailExists){
            return res.status(400).json({userMsg:"Username already exists!", mailMsg:"Email already exists!"})
        }
        else if(usernameExists){
            return res.status(400).json({msg:"Username already exists."})
        }else if(mailExists){
            return res.status(400).json({msg:"Email already exists."})
        }
        

        // create actual user in db
        //// password: hashPassword needed else catch block executed
        
        const userCreated =  await User.create({username, email, password,package});

        // const token = await userCreated.generateToken()
        //  // Set cookie with token   
        //  res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        // });
        
        //return created data 
        res.status(201).json({msg: "Successfully Registered!!", userId: userCreated._id.toString(), username: userCreated.username});

    } catch (error) {
        console.log("error")
        res.status(404).send( {msg: error} )

    }
}

// LOGIN LOGIC

const login = async (req,res) => {


    try {
        const { email,password } = req.body

        const userExists = await User.findOne({ email })
        
        if(!userExists || userExists.email == "admin@mail.com"){
            return res.status(400).json({msg: "Invalid Credentials"})
        }
        
        //compareHash user-def methods of userSchema in user-model.js (like generateToken)
        // faster this way(i think)
        const isPwValid = await userExists.compareHash(password)
        
        if (isPwValid){
            const token = await userExists.generateToken();

            // Set cookie with token
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            });

            return res.status(200).json({status: "user", token: token, userId: userExists._id.toString(), username: userExists.username, activeUsersCount: userExists.activeUsersCount});


        }else{
            return res.status(401).json({msg: "Invalid Credentials"})
        }
        
    } catch (error) {
        res.status(500).json("Internal server error!!")
        
    }
};

const logout = async (req,res) => {
    try {
        res.cookie("token", "",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: 0,
            maxAge:0
        });

        console.log(req.cookies.token)
        
        res.status(200).json({
          status: 'success',
        });
      }
    catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      }
}


const forgetPassword = async (req,res) => {
    try {
        
        const {email} = req.body.email
        
        const findUser = User.findOne({ email: email })
        
        if (!findUser){
            return res.status(400).json({err: "No such user exists!"})
        }
        // return res.json({msg: findUser})
        
        const userEmail = req.body.email
        const pwResetToken = jwt.sign({ email : userEmail}, process.env.RESET_PW_KEY, {expiresIn: '2h'})

        const link = "http://" + req.hostname + ":5173/changePassword/" + pwResetToken

        const sendToMail = req.body.email
        
        const sendMail = await sendResetMail(sendToMail,link)
        // return res.json({msg: sendToMail})

        if (sendMail){
            res.status(400).json({success:false, msg:"Error in sending mail"})
        }else{
            return res.status(200).json({success:true, msg:"Sent password link successfully!"})
        }
        
    } catch (error) {
        return res.status(400).json({ insendotp : error})
        
    }
}

const updatePassword = async (req,res) => {
    try {
        const token = req.body.token
        const updatedPassword = req.body.newPassword

        const decodedToken = jwt.verify(token, process.env.RESET_PW_KEY);
        const email = decodedToken.email
        // return res.json(decodedToken)

        const user = await User.findOne({email: email})

        user.password = updatedPassword

        const updatePwUser = await user.save() 
        if (updatePwUser){

            res.json({ msg: updatedPassword, token: token, user: user})
        }else{
            res.json({ err: "Could not update password"})
        }

        
    } catch (error) {
        res.json({err: error})
        
    }
}

const user = async (req,res,next) => {
    try {
        //console.log("from auth controller")
        res.status(200).json({user: req.user})
    } catch (error) {
        console.log(error)
        
    }
}



module.exports = { home, register ,login , logout, forgetPassword, updatePassword, user };