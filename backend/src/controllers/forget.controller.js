const forgetRouter = require('express').Router()
const randToken = require('rand-token')
const User = require('../models/user.model')
const EMAIL_TRANSPORTER = require('../configs/nodemailer.config')

const generateToken = (s) => {
    var resetToken = randToken.generate(s, "0123456789")
    return Number(resetToken)
}

forgetRouter.post('/', async (req, res) => {
    const { email } = req.body
    let check = await User.findOne({ email: email })

    if(!check) {
        return res
                .status(400)
                .json('Email does not exist')
    }

    const resetToken = generateToken(4)

    let info = await EMAIL_TRANSPORTER.sendMail({
        from: "ikramahmed.test@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `A password reset request was received from this address. Your token is ${resetToken}.`,
        html: `<p>A password reset request was received from this address.</p>
                <br />
                <p>Your token is ${resetToken}.</p>`
    })

    console.log("Message sent: %s", info.messageId);

    return res
            .status(200)
            .json({
                email: email,
                resetToken: resetToken
            })
})

module.exports = forgetRouter