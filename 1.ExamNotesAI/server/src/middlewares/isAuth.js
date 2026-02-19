const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")


async function isAuthMiddleware(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized !"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(500).json({
            message:`is auth error ${error}`
        })
    }
}

module.exports={
    isAuthMiddleware
}