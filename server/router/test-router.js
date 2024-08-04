const express = require("express")
const tests = require("../controllers/test-controller")

const uploadImg = require("../controllers/upload-controller")
const multer = require("multer")

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, '../client/public/')
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.name}-${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

// 'imageFile' is the name of INPUT FIELD in the upload FORM
router.route("/test").get(tests).post(upload.single('imageFile'), uploadImg)

module.exports = router