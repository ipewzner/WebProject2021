const express = require('express');
const router = express.Router();
const User = require('../model')("User");
const debug = require('debug')('users:login');
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const validPassword = require('../lib/passwordUtils').validPassword;
const Mail = require('../lib/mail');
const NodeRSA = require('node-rsa');
//var jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    var poblicKey='kokok1234';
    console.log("!!!!!!!!!!!!!!!!!!+body"+req.url);
    if (req.session.userId === undefined) {
        req.session.referer = req.get('Referer');
        if (req.session.referer === undefined) req.session.referer = '/';
        res.render("login", { title: "Login", problem: req.session.badLogin,poblicKey:poblicKey });
    }
    else res.redirect('/');
});

router.post('/', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login/login-success' }));

router.get('/login-success', (req, res, next) => {
    // res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
    res.redirect(req.session.referer);
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

router.get('/register', async (req, res) => res.render("register", { title: "Register", problem: null }));
router.get('/forget-password', async (req, res) => res.render("forget-password", { title: "forget-password", problem: null }));

router.post('/forget-password', async (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(async (user) => {
            if (user) {
                console.log('---------------');
                console.log("user.email: " + user.email);
                console.log("user.username: " + user.username);
                console.log('---------------');

                user.save().then(async () => {
                    var resetToken = (Math.floor(Math.random() * 1000000)).toString();
                    console.log('resetToken: ', resetToken);
                    var html = `<h1>reset password</h1><h5>click in this `
                        + `<a href="http://localhost:8083/login/resetPassword/${resetToken}">link</a>`
                        + ` to reset the password.</h5><h6>if you don\'t reqwest password reset plase lat as know!</h6>`;
                       
                        console.log('----- html ----');
                        console.log('html: ', html);
                        console.log('---------------');

                    user.updateOne({ resetToken: resetToken, expireToken: Date.now() + 3600000 }, async function (err, success) {
                        if (err) res.status(400).json({ error: "reset link error" });
                        else {
                            await Mail.sendMail(user.email, html);
                            res.json({ message: "email send." });
                        }
                    })
                })
            }
            else res.send('<h1>user not found!</h1>');
        })
        .catch((err) => { next(err); console.log("err: " + err); });
});

router.get('/resetPassword/:resetToken', async (req, res, next) => {
    console.log(" req.params ", req.params);
    User.findOne({ resetToken: req.params.resetToken })
        .then((user) => {
            if (user.expireToken > Date.now()) res.render('passwordResetForm', { title: "passwordReset", problem: null });
            else throw (err);
        }).catch((err) => {
            res.send('<h5>not-valid, return to <a href="http://localhost:8083/login">login</a> plase!</h5>');
        });
})

router.post('/resetPassword/:resetToken', async (req, res, next) => {
    console.log(" req.params ", req.params);
    User.findOne({ resetToken: req.params.resetToken })
        .then((user) => {
            if (user.expireToken > Date.now()) {
                user.updateOne({ password: genPassword(req.body.newPassword) }, async function (err, success) {
                    if (err) res.status(400).json({ error: "update failure" });
                    else res.send('<h5>update sucsess!, return to <a href="http://localhost:8083/login">login</a> plase!</h5>');
                });
            } else throw (err);
        }).catch((err) => {
            res.send('<h5>not-valid, return to <a href="http://localhost:8083/login">login</a> plase!</h5>');
        });
});

router.post('/register', (req, res, next) => {

    const newUser = new User({
        username: req.body.username,
        password: genPassword(req.body.password),
        email: req.body.email,
        admin: true
    });
    console.log(newUser);
    newUser.save().then((user) => console.log(user));
    res.redirect('/login');
});

module.exports = router;

