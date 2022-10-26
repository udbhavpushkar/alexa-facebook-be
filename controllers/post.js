const Post = require("../models/post")
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createPost = async (req, res) => {
    try {
        let headers = req.headers
        let token = headers.authorization.split(" ")[1]

        const decoded = jwt.verify(token, "NEWTON")

        const currentUser = await User.findById(decoded.id)


        const { title, content } = req.body
        const post = new Post({
            title, content, owner: currentUser._id
        })

        const postData = await post.save()
        res.status(200).json(postData)

    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const readPosts = async (req, res) => {
    try {
        let postsData = await Post.find().populate("owner", "-password").sort({ createdAt: -1 })
        res.status(200).json(postsData)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id
        let data = await Post.findById(id)
        if (data._id === req.user._id) {
            let postsData = await Post.findByIdAndDelete(id)
            res.status(200).json(postsData)
        } else {
            throw "Only owner can delete"
        }

    } catch (error) {
        res.status(400).json({ message: error })
    }
}

module.exports = { createPost, readPosts, deletePost }