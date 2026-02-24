const express = require("express")
const { isAuthMiddleware } = require("../middlewares/isAuth")
const { generateNotes } = require("../controllers/gemini.controller")
const route = express.Router()



route.post("/generate-notes", isAuthMiddleware, generateNotes)


module.exports = route