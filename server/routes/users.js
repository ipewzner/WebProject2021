import express from 'express';
import {signin,signup,forgetPassword,resetPassword,signinByToken } from '../controllers/user.js'
import auth from '../middleware/auth.js';
const router=express.Router();
router.all('/',(req, res,next) =>{console.log("req.body "+req.body);next();});

router.post('/signinByToken',signinByToken);
router.post('/signin',signin);
router.post('/signup',signup);
router.post('/forgetPassword',forgetPassword);
router.post('/resetPassword', resetPassword)
export default router;