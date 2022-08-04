require('dotenv').config()

const JWT_SECRET = process.env.TOKEN_SECRET

module.exports = JWT_SECRET