const express = require("express")
const router = express.Router()
const { createPost, readPosts, deletePost } = require("../controllers/post")

router.post("/", createPost)
router.get("/", readPosts)
router.delete("/:id", deletePost)

module.exports = router