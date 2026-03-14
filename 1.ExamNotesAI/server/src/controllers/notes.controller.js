const notesModel = require("../models/notes.model")



async function getMyNotes(req, res) {
    try {
        const userId = req.userId
        const notes = await notesModel.find({ user: userId }).select("topic classType examType revisionMode includeDiagram includeChart createdAt").sort({ createdAt: -1 })
        if (!notes) {
            return res.status(404).json({
                error: "Note not found !"
            })
        }
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(500).json({ message: `getCurrentUser notes error ${error}` })
    }
}


async function getSingleNotes(req, res) {
    try {
        const note = await notesModel.findOne({
            _id: req.params.id,
            user: req.userId
        })

        if (!note) {
            return res.status(404).json({
                error: "Note not found !"
            })
        }
        return res.status(200).json(note)
    } catch (error) {
        return res.status(500).json({ message: `getSingle note error ${error}` })

    }
}

module.exports={
    getMyNotes ,getSingleNotes
}