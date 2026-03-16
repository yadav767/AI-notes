const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/user.route")
const notesRouter = require("./routes/gemini.route")
const pdfRouter = require("./routes/pdf.route")
const creditRouter = require("./routes/credits.route")
const { stripeWebhook } = require("./controllers/credits.controller")
const app = express()


app.post(
    "/api/credits/webhook",
    express.raw({ type: "application/josn" }),
    stripeWebhook
)

app.use(cors(
    {
        origin: "https://ai-notes-silk.vercel.app",
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
))
app.use(cookieParser())
app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running!" })
})

app.use("/api/auth", authRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/credit", creditRouter)


module.exports = app
