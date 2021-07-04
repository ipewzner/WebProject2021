import express from 'express';
import {signin,signup,forgetPassword,resetPassword,signinByToken,getUsers,createUser,updateUser,deleteUser } from '../controllers/user.js'
import {auth,isAdmin} from '../middleware/auth.js';

const router=express.Router();
router.all('/',(req, res,next) =>{console.log("req.body "+req.body);next();});

router.get('/',()=>{console.log("getUsers8888");next();},getUsers);
router.post('/',createUser);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

router.post('/signinByToken',signinByToken);
router.post('/signin',signin);
router.post('/signup',signup);
router.post('/forgetPassword',forgetPassword);
router.post('/resetPassword', resetPassword)
export default router;