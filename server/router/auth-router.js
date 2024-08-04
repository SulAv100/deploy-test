const express = require("express");

const router = express.Router();

const authc = require("../controllers/auth-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const activeUserMiddleware = require("../middleware/activeUser-middleware");
const logoutUserMiddleware = require("../middleware/logoutUser-middleware");

router.route("/").get(authc.home);

router.route("/register").post(adminMiddleware,authc.register);
router.route("/login").post(activeUserMiddleware.checkActiveUser, authc.login);

// added a middleware to increase the decrease the count when user logouts
router.route("/logout").post(logoutUserMiddleware.logoutUser, authc.logout);
router.route("/forgetPassword").post(authc.forgetPassword);
router.route("/updatePassword").put(authc.updatePassword);
router.route("/user").get(authMiddleware, authc.user);

module.exports = router;
