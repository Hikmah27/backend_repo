const express = require("express");
const router = express.Router();
// const { getLandingPage, registerUser, signin, getFormikPage } = require("../controllers/user.controller")
const { getLandingPage, registerUser, signIn, getDashboard } = require("../controllers/user.controller")

router.get("/", getLandingPage)
router.get("/dashboard", getDashboard)
router.post("/signup", registerUser)
router.post("/signin", signIn)
// router.post("/formik", getFormikPage)

module.exports = router;