const express = require("express")
const router = express.Router()
const { createPost, readPosts } = require("../controllers/post")

router.post("/", createPost)
router.get("/", readPosts)

module.exports = router