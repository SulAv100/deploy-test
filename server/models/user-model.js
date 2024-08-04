const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    package:{
        //0 - basic
        //1 - intermediate
        //2 - gold
        type:Number,
        default:0,
    },
    activeUsersCount:{
        type:Number,
        required:true,
        default:0,
    },
});


//define model

userSchema.pre("save", async function(next){
    const user = this;
    
    // if password already hashed or already existing pw not modified(maybe forget pw ma)
    if (!user.isModified("password")){
        next();
    }
    
    try {
        const saltRound = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashPassword
    } catch (err) {
        next("err in hash pw:", err);
        
    }
});


// json webtoken
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email : this.email,
                isAdmin:this.isAdmin
            },
            process.env.JWT_SECRET_KEY,{
                expiresIn : "30d",
            }
        );
    } catch (error) {
        console.log("err in gen token: ",error)
        
    }
}

// hashed pw compare(self)
userSchema.methods.compareHash = async function(pw){
    try {
        return bcrypt.compare(pw, this.password);
    } catch (error) {
        console.log("err in compare hash pw", error)
        
    }
}


//define model/collection name
const User = new mongoose.model("User", userSchema)

module.exports = User;