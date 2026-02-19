const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")


async function registerUserController(req, res) {
    const { name, email } = req.body;
    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({ name, email });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2d" }
        );
        res.cookie("token", token);
        return res.status(200).json({
            message: "User registered successfully !",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `googleSignup ${error}`
        })
    }
}

async function logoutUserController(req, res) {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            message: "LogOut successfully !"
        })
    } catch (error) {
        res.status(500).json({
            message: `error: ${error}`
        })
    }
}

async function getCurrentUser(req, res) {
    try {
        const userId = req.userId
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "Current user not found is not found !"
            })
        }
        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: `get current user : ${error}`
        })
    }
}

module.exports = {
    registerUserController, logoutUserController,getCurrentUser
}