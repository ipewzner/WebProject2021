import express from 'express';
import { signin, signup, forgetPassword, resetPassword } from '../controllers/auth2.js'
const router = express.Router();
import passport from 'passport';

//router.all('/',(req, res,next) =>{console.log("req.body "+req.body);next();});

router.post('/signin',
    function (req, res, next) {
        passport.authenticate('local',
            function (err, user, info) {
               user.password='';
                console.log("signin->user: "+user);
             //   console.log("*********?222------"+res.session);
                user ? res.status(200).json({ result: user }) : res.status(400);
            })(req, res, next)
        }
    );


router.get('/login-success', (req, res, next) => {
    console.log("**login-success--"); res.status(200);
});
/*
router.get('/facebookLogin', (req, res, next) => {
    console.log("router->auth2->facebookLogin");
    passport.authenticate('facebook');
    console.log("router->auth2->facebookLogin-finish?");
});
*/
router.get('/facebookLogin',passport.authenticate('facebook', { scope: ['profile'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login',session: true }),
  ()=>console.log("?????????")
);

router.get('/getLogedIn', (req, res, next) => {
    console.log("getLogedIn");
    res.user;
})

router.get('/getuser', (req, res) => {
    console.log("getLogedIn "+req.user);
    res.send(req.user);
})

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
   

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:4000/about', session: true }),
  function (req, res) {
      console.log("xxxxxxxxx google xxxxxxx")
    res.redirect('http://localhost:4000');
 });


router.get('/login-failure', (req, res, next) => { res.send('You entered the wrong password.'); });

router.post('/signup', signup);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', resetPassword);

//router.delete('/:id',deletePost);
//router.patch('/:id/likePost',likePost);

    router.get('/logout', function (req, res){
        console.log("logout ------"); 
        req.logOut()  // <-- not req.logout();
     //   res.redirect('/')
      });

export default router;