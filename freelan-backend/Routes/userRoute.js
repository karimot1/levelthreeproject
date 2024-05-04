const express = require("express")
const router = express.Router()

const {SignUp,Login}= require("../Controllers/userController")
const VerifyToken = require("../MiddleWare/ValidateToken")

router.post("/sign-up",SignUp)
router.post("/login",Login)

module.exports =  router