const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const JWT_SECRET = require('../configs/jwt.config')

const userExtractor = async (req, res, next) => {
    try {
        const token = req.token
        const decodedToken = jwt.verify(token, JWT_SECRET)

        if(!token || !decodedToken) {
            return res.status(401).json({ error: 'Token missing or invalid' })
        }

        req['user'] = await User.findById(decodedToken.id)

    } catch (error) {
        next(error)
    }

    next()
}

module.exports = userExtractor