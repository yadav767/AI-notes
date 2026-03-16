const express=require("express")
const { isAuthMiddleware } = require("../middlewares/isAuth")
const PDFDownloadController = require("../controllers/pdf.controller")
const router=express.Router()

router.post("/generate-pdf",isAuthMiddleware,PDFDownloadController)


module.exports=router