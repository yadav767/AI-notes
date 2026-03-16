const express=require("express")
const { registerUserController, logoutUserController, getCurrentUser }=require("../controllers/auth.controller")
const { isAuthMiddleware } = require("../middlewares/isAuth")

const router=express.Router()

//Login
router.post("/google",registerUserController)

//logout
router.get("/logout",logoutUserController)


//Get current user
router.get("/current-user",isAuthMiddleware,getCurrentUser)


module.exports=router