const express = require('express');
const router = express.Router();

const {postsController} = require("../controllers/postsController");
const {postImageController} = require("../controllers/postImageController");
const {getUserPostsController} = require("../controllers/getUserPostsController");
const {createPostController} = require("../controllers/createPostController");
const {updatePostController} = require("../controllers/updatePostController");
const {deletePostController} = require("../controllers/deletePostController");


router.get('/posts', postsController);
router.get('/posts/image/:id', postImageController);
router.get('/users/:id/posts', getUserPostsController);
router.post('/users/:id/posts', createPostController);
router.put('/users/:id/posts/:pid', updatePostController);
router.delete('/users/:id/posts/:pid', deletePostController);

module.exports = router;