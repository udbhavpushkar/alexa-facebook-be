const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports = Post