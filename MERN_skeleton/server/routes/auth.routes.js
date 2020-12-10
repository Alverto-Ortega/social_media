//auth API endpoints for sign-in and sign-out
import express from 'express';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();
//post and get requests invokes the corresponding controller functions in auth.controller.js
router.route('/auth/signin').post(authCtrl.signin);
router.route('/auth/signout').get(authCtrl.signout);

export default router;
