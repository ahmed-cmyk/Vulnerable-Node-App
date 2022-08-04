const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const JWT_SECRET = require('../configs/jwt.config')

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    const passwordCorrect = user === null
        ? false
        : password === user.password

    console.log(user)

    if(!user) {
        return res.status(401).json({
            error: 'Invalid username'
        })
    }

    if(!passwordCorrect) {
        console.log('backend error', 'password wrong')
        return res.status(401).json({
            error: 'Invalid password'
        })
    }

    const userForToken = {
        username: user.username,
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(userForToken, JWT_SECRET)
    
    res.status(200)
       .json({
            token,
            username: user.username,
            name: user.name,
            email: user.email
       })
})

module.exports = loginRouter