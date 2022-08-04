const mongoose = require('mongoose')
const User = require('../models/user.model')

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })

    res.status(200).json(users)
}

const getUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user found' })
    }

    const user = await User.findById(id)

    if(!user) {
        return res.status(400).json({ error: 'An unknown error occured' })
    }

    res.status(200).json(user)
}

const createUser = async (req, res) => {
    const { username, name, password } = req.body

    try {
        const user = await User.create({ username, name, password })
        res.status(200).json(user)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user found' })
    }

    const user = await User.findByIdAndUpdate(id, { ...req.body }, { new: true })

    if(!user) {
        return res.status(400).json({ error: 'An unknown error occured' })
    }

    res.status(200).json(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user found' })
    }

    const user = await User.findByIdAndDelete(id)

    if(!user) {
        return res.status(400).json({ error: 'An unknown error occured' })
    }

    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}