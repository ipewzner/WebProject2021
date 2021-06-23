import passport from 'passport';
import passportLocal from "passport-local";
//const connection = require('./database');
//const User = connection.models.User;
import User from "../models/user.js";
import {validPassword} from '../lib/passwordUtils.js';
const LocalStrategy = passportLocal.Strategy;

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (email, password, done) => {
    User.findOne({ email: email })
        .then((user) => {
            if (!user) { console.log('fail');  return done(null, false); }
            const isValid = validPassword(password, user.password);
            if (isValid) { console.log('user '+user.email); return done(null, user);}
            else {console.log("isn't Valid!");  return done(null, false);}
        })
        .catch((err) => {done(err);});
}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log('serializeUser '+user.email);
    done(null, user);
});

passport.deserializeUser((userId, done) => {
    console.log('deserializeUser');
    User.findById(userId)
        .then((user) => { done(null, user); })
        .catch(err => done(err))
});

