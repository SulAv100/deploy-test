const mongoose = require("mongoose");



const scoreSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    correctValue:{
        type: Number,
        required:true,
        default:0,
    },
    totalImage:{
        type:Number,
        required:true,
        default:0,
    },
    date:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model("Score",scoreSchema)