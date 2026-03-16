const express = require("express")
const { createCreditOrder } = require("../controllers/credits.controller")
const { isAuthMiddleware } = require("../middlewares/isAuth")

const route = express.Router()

route.post("/order", isAuthMiddleware, createCreditOrder)



module.exports = route