import express from 'express';
import {signin,signup,forgetPassword,resetPassword } from '../controllers/user.js'
const router=express.Router();
router.all('/',(req, res,next) =>{console.log("req.body "+req.body);next();});

router.post('/signin',signin);
router.post('/signup',signup);
router.post('/forgetPassword',forgetPassword);
router.post('/resetPassword', resetPassword)
export default router;