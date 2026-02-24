const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/user.route")
const notesRouter=require("./routes/gemini.route")
const app = express()


app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
))
app.use(cookieParser())
app.use(express.json())



app.use("/api/auth", authRouter)
app.use("/api/notes",notesRouter)

module.exports = app