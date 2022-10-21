const User = require("../models/user")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body

        //check whether user exsist or not
        const userExsists = await User.findOne({ email })
        if (userExsists) {
            throw "User alreadyy exsists"
        }


        //if dont exsist, then encypt the password and save the user
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log(hashedPassword);

        const user = new User({
            name, email, password: hashedPassword
        })

        const savedUser = await user.save()

        res.status(200).json({
            name: savedUser.name, email: savedUser.email
        })


    } catch (error) {
        res.status(400).json({ messgae: error })
    }
}

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body

        //check whether we have this email registered
        const user = await User.findOne({ email })

        const passwordCorrect = await bcrypt.compare(password, user.password)
        if (user && passwordCorrect) {
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email
            })
        } else {
            throw "Wrong credentials"
        }

        //if registered check password


    } catch (error) {
        res.status(400).json({ messgae: error })
    }
}

module.exports = { registerUser, loginUser }