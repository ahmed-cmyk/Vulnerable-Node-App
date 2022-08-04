const resetRouter = require('express').Router()
const User = require('../models/user.model')

resetRouter.patch('/', async (req, res) => {
    const { email, password } = req.body

    let user = await User.findOneAndUpdate({ email: email }, { password: password }, { new: true })

    if(!user) {
        return res
                .status(400)
                .json({ error: 'User not found' })
    }

    return res
            .status(200)
            .json(user)
})

module.exports = resetRouter