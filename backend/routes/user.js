import express from 'express';
import { signIn, signUp, signInWithGoogle, tokenConfirmation, resendToken} from '../controllers/user.js';
import Auth from '../utils/middleware/Auth.js';
const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/signInWithGoogle', signInWithGoogle);
router.post('/resendToken',Auth,resendToken);
router.get('/confirmation',tokenConfirmation);
export default router;