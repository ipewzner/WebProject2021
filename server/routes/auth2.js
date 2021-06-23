import express from 'express';
import { signin, signup, forgetPassword, resetPassword } from '../controllers/auth2.js'
const router = express.Router();
import passport from 'passport';

//router.all('/',(req, res,next) =>{console.log("req.body "+req.body);next();});

router.post('/signin', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login/login-success' }));

router.get('/login-success', (req, res, next) => { res.status(200); console.log("signin V"); });

router.get('/login-failure', (req, res, next) => { res.send('You entered the wrong password.'); });

router.post('/signup', signup);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', resetPassword);

//router.delete('/:id',deletePost);
//router.patch('/:id/likePost',likePost);


export default router;