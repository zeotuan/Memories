import express from 'express';
import { signIn, signUp, signInWithGoogle} from '../controllers/user.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/signInWithGoogle', signInWithGoogle);

export default router;