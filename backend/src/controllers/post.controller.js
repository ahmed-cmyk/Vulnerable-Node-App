const mongoose = require('mongoose')
const Post = require('../models/post.model')

const getPosts = async (req, res) => {
    const posts = await Post
                    .find({})
                    .populate({ path: 'author', select: 'username name -_id' })
                    .sort({ createdAt: -1 })

    res.status(200).json(posts)
}

const getPost = async (req, res) => {
    const { id } = req.params
    console.log(req.user)

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Post not found' })
    }

    const post = await Post.findById(id)

    if(!post) {
        return res.status(400).json({ error: 'Something went wrong' })
    }

    res.status(200).json(post)
}

const createPost = async (req, res) => {
    const { title, body, author } = req.body

    try {
        const post = await Post.create({ title, body, author })
        res.status(201).json(post)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No post found' })
    }

    const post = await Post.findByIdAndUpdate(id, { ...req.body }, { new: true })

    if(!post) {
        return res.status(400).json({ error: 'Something went wrong' })
    }

    res.status(200).json(post)
}

const deletePost = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No post found' })
    }

    const post = await Post.findByIdAndDelete(id)

    if(!post) {
        return res.status(400).json({ error: 'Something went wrong' })
    }

    res.status(200).json(post)
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}