const express = require("express");

const userc = require("../controllers/user-controller")

const authc = require("../middleware/auth-middleware")

const router = express.Router();


// router.route("/").get(userc.getAllUsers)
router.route("/totalOptions").get(authc,userc.totalOptions)
router.route("/option").get(authc,userc.option)
router.route("/saveScore").post(authc,userc.saveScore)
router.route("/showHistory").post(authc,userc.sendHistory);

module.exports = router;