const fs = require("fs")
const path = require("path")
const User = require("../models/user-model")
const Img = require("../models/image-model")
const bcrypt = require("bcryptjs")

const adminLogin = async (req,res) => {
    try {

        const { email,password } = req.body
        const userExists = await User.findOne({ email })
        const isPwValid = await userExists.compareHash(password)

        if (!userExists){
            return res.status(400).json({err: "Incorrect Credentials!"})
        }

        // hashpw = await bcrypt.hash(userExists.password, 8)

        // return res.json(hashpw)

        if (!isPwValid){
            return res.status(400).json({err: "Incorrect Credentials!"})
        }
        const token = await userExists.generateToken();
        if (email == "admin@mail.com" && password == "qwerty@123")
        {
            res.cookie("adminToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            });
            return res.status(200).json({status: "admin"})
        }
        else{
            return res.status(400).json({err: "Wrong Gateway!"})
        }
        
            

    } catch (error) {
        res.status(400).json({err: error})
        
    }
}

const getAllUsers = async (req,res) => {
    try {
        // get all users w/o their password
        const users = await User.find({},{password:0})
        if (!users || users.length ==0)
        {
            return res.status(404).json({err: "No Users found!"})
        }
        const endUsers = users.filter(user => !user.isAdmin)
        
        res.json({endUsers: endUsers})
    } catch (error) {
        console.log(error);
        
    }
}

const getAllImgs = async (req,res) => {
    try {
        const imgs = await Img.find()
        if(!imgs || imgs.length == 0){
            return res.status(404).json({err: "No images found!!"})
        }

        const imgCount = imgs.length

        res.status(200).json({imgs: imgs, imageCount: imgCount})
        
    } catch (error) {
        console.log("in fetching all images::: ",error)
        
    }
}

const deleteUserById = async (req,res,next) => {
    try {
        // params is parameter passed in the :id in admin-router 
        const id = req.params.id
        const user = await User.findById({_id:id})

        res.json({msg: `deleted user ${user.username}`})
        
        await User.deleteOne({ _id: id})
    } catch (error) {
        console.log(error)
        next()
        
    }
}

const checkAdmin = async (req,res) => {
    try {
        return res.json({msg: "succes"})
        
    } catch (error) {
        return res.status(400).json({ error })
        
    }
}


const adminLogout = async (req,res) => {
    try {
        res.cookie("adminToken", "",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: 0,
            maxAge:0
        });

        // console.log(req.cookies.token)
        
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


const deleteImgById = async (req,res) => {
    try {
        const delImgId = req.params.imgId
        
        const image = await Img.findById({ _id: delImgId})

        if (!image) {
            return res.status(404).json({ msg: "Image not found" });
        }
        
        const filePath = path.join(__dirname, '..','..', 'client', 'public', 'uploads', image.name);
        // return res.json(filePath)
        
        await Img.deleteOne({_id: delImgId})

        // Delete the file from the file system
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Failed to delete the image file" });
            }
            
            res.json({ msg: "Image Deleted Successfully!" });
        });
        
        
    } catch (error) {
        res.json({msg : "when deleting img"})
        
    }
}

module.exports = {adminLogin, getAllUsers, getAllImgs, deleteUserById, checkAdmin, adminLogout, deleteImgById}