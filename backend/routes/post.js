import express from 'express';
import {getPosts,getPostsBySearch,createPost,updatePost,deletePost, likePost, getPost, getImage, getManyImage} from '../controllers/post.js';
import Auth from '../utils/middleware/Auth.js';
const router = express.Router();

router.get('/search', getPostsBySearch);

router.get('/:id', getPost);

//route for testing image feature
router.get('/image/:id', getImage);

router.get('/images/getMany',getManyImage);
// end testing route

router.post('/',Auth,createPost);

router.patch('/:id',Auth,updatePost);

router.delete('/:id',Auth,deletePost);

router.patch('/:id/likePost',Auth, likePost);

router.get('/', getPosts);

export default router;