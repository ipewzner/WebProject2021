import express from 'express';
import {signin,signup,forgetPassword } from '../controllers/user.js'
const router=express.Router();
import {isAuth} from './auth.js';

router.all('/',(req, res,next) =>{console.log("req.body "+req.body);next();});

router.post('/signin',signin);
router.post('/signup',signup);
router.post('/forgetPassword',forgetPassword);

export default router;