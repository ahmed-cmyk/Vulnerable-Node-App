const nodemailer = require('nodemailer')
require('dotenv').config()

const EMAIL_TRANSPORTER = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

module.exports = EMAIL_TRANSPORTER