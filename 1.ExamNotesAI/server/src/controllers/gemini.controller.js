const generateGeminiResponse = require("../services/gemini.services")
const notesModel = require("../models/notes.model")
const userModel = require("../models/user.model")
const buildPrompt = require("../utils/promptBuilder")

async function generateNotes(req, res) {
    try {
        const { topic, classType, examType, revisionMode, includeDiagram, includeChart } = req.body
        const userId = req.userId
        if (!topic) {
            return res.status(400).json({
                message: "Topic is required !"
            })
        }
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).json({
                message: "User not found!"
            })
        }

        if (user.credits < 10) {
            user.isCreditAvailable = false
            await user.save()
            return res.status(403).json({
                message: "Insufficient credits !",
            })
        }

        const prompt = buildPrompt({
            topic,
            classType,
            examType,
            revisionMode,
            includeDiagram,
            includeChart
        })

        const aiResponse = await generateGeminiResponse(prompt)
        const newNote = await notesModel.create({
            user: user._id,
            topic,
            classType,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content: aiResponse
        })

        user.credits -= 10;
        if (user.credits <= 0) {
            user.isCreditAvailable = false;
        }
        if (!Array.isArray(user.notes)) {
            user.notes = []
        }
        user.notes.push(newNote._id)
        await user.save()

        return res.status(200).json({
            data: aiResponse,
            noteId: newNote._id,
            creditsLeft: user.credits
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "AI generate failed !",
            message: error.message
        })
    }
}
module.exports = {
    generateNotes
}