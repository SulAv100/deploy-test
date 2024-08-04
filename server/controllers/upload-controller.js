// const multer = require("multer")
// const upload = multer({ dest: 'uploads/'})
const ImageModel = require("../models/image-model")

const uploadImg = async (req,res) => {
    try {

        const modifiedName = req.file.filename;

        const newImg = new ImageModel({
            name: modifiedName,
        });

        await newImg.save();
        res.send({ msg: "Upload Success" });

        // res.json({ imageFields: req.body, imageInfo: req.file ,path:req.file.path})
        
    } catch (error) {
        console.log(`tests: ${error}`)
        
    }
}

module.exports = uploadImg