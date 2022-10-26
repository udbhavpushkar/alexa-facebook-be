const jwt = require("jsonwebtoken")
const User = require("../models/user")

const authorize = async (req, res, next) => {
    try {

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1]

            const decoded = jwt.verify(token, "NEWTON")

            const currentUser = await User.findById(decoded.id)

            if (currentUser) {
                req.user = currentUser
                next() //move to next funtion
            } else {
                throw "Invalid token"
            }

        } else {
            throw "No authorization"
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports = { authorize }