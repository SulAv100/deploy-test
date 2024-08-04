const { Schema, model } = require("mongoose")

const imageSchema = new Schema({
    // yesmai modified name save handine so kun number ho aafai image ko name aagadi hunxa 
    name: { type: String, required: true},
})


const ImageModel = new model("Image", imageSchema)



module.exports = ImageModel