const Image = require("../models/image-model")


const imgFiles = async (req,res) => {
    try {
        const response = await Image.find();

        if (!response){
            res.status(404).json({ msg: "No data for test found!"})
        }

        res.status(200).json({ images : response })
        
    } catch (error) {
        console.log(`tests: ${error}`)
        
    }
}

module.exports = imgFiles