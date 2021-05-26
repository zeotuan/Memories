import express from 'express';
import {getPosts,getPostsBySearch,createPost,updatePost,deletePost, likePost, getPost, getImage} from '../controllers/post.js';
import Auth from '../utils/middleware/Auth.js';
const router = express.Router();

router.get('', getPosts);

router.get('/search', getPostsBySearch);

router.get('/:id', getPost);

router.get('/image/:id', getImage);

router.post('/',Auth,createPost);

router.patch('/:id',Auth,updatePost);

router.delete('/:id',Auth,deletePost);

router.patch('/:id/likePost',Auth, likePost);


export default router;