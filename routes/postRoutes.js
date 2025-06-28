const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts
} = require('../controllers/postController');


router.post('/', verifyToken, createPost);
router.get('/', getPosts);
router.get('/mine', verifyToken, getMyPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;