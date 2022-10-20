const Post = require("../models/post")

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body
        const post = new Post({
            title, content
        })

        const postData = await post.save()
        res.status(200).json(postData)

    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const readPosts = async (req, res) => {
    try {
        let postsData = await Post.find().sort({ createdAt: -1 })
        res.status(200).json(postsData)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = { createPost, readPosts }