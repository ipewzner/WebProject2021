import express from 'express';
import auth from '../middleware/auth.js'
import {getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js'
const router=express.Router();
router.get('/',auth,getPosts);
router.post('/',createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);

export default router;