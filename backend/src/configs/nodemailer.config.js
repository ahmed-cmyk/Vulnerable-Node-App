const nodemailer = require('nodemailer')
require('dotenv').config()

const EMAIL_TRANSPORTER = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

module.exports = EMAIL_TRANSPORTER