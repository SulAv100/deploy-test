const express = require("express")
const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")

const uploadImg = require("../controllers/upload-controller")
const multer = require("multer")


const adminc = require('../controllers/admin-controller')


const router = express.Router()

// to store filename and destination of new uploaded image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // new image uploaded inside client/public/uploads folder
        cb(null, '../client/public/uploads/')
    },
    filename: function (req, file, cb) {


        // so yei name hamle database ma save garne ho so 2 ta field chaiyena
        const modifiedName = `${req.body.name}-${Date.now() + file.originalname}`;
        cb(null, modifiedName)
    }
});

const upload = multer({ storage })

router.route('/adminLogin').post(adminc.adminLogin)
router.route('/adminLogout').post(adminMiddleware, adminc.adminLogout)
router.route("/checkAdmin").get(adminMiddleware, adminc.checkAdmin)

router.route('/users').get(adminMiddleware , adminc.getAllUsers)
router.route('/user/delete/:id').post(adminMiddleware ,  adminc.deleteUserById)

router.route('/imgs').get(adminMiddleware , adminc.getAllImgs).post(adminMiddleware, upload.single("imageFile"), uploadImg)
router.route("/imgs/delete/:imgId").post(adminMiddleware , adminc.deleteImgById)


module.exports = router