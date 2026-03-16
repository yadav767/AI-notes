const express = require("express")
const { isAuthMiddleware } = require("../middlewares/isAuth")
const { generateNotes } = require("../controllers/gemini.controller")
const { getMyNotes, getSingleNotes } = require("../controllers/notes.controller")
const route = express.Router()



route.post("/generate-notes", isAuthMiddleware, generateNotes)
route.get("/getnotes",isAuthMiddleware,getMyNotes)
route.get("/:id",isAuthMiddleware,getSingleNotes)


module.exports = route