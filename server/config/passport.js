import passport from 'passport';
import passportLocal from "passport-local";
import passportFacebook from 'passport-facebook';
//import FacebookStrategy from 'passport-facebook'; 
import passportGoogle from 'passport-google-oauth20';

import User from "../models/user.js";
import { validPassword } from '../lib/passwordUtils.js';
import { FACEBOOK } from './keys.js';

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

const verifyCallbackToLocal = (email, password, done) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) { console.log('fail'); return done(null, false); }
      const isValid = validPassword(password, user.password);
      if (isValid) { console.log('user valid ' + user.email); return done(null, user); }
      else { console.log("isn't Valid!"); return done(null, false); }
    })
    .catch((err) => { done(err); });
}

const verifyCallbackToFacebook = (accessToken, refreshToken, profile, done) => {
  console.log('verifyCallbackToFacebook');
  User.findOne({ email: profile.email })
    .then((user) => {
      console.log('verifyCallbackToFacebook->user' + user);

      if (!user) { console.log('fail'); return done(null, false); }
      else { console.log('user valid ' + user.email); return done(null, user); }
    })
    .catch((err) => { done(err); });
}

const verifyCallbackToGoogle = (_, __, profile, cb) => {
  console.log('verifyCallbackToGoogle ***');
  console.log('!!!profile: ');

  const email=profile.emails[0].value;
  console.log('profile: '+email);
  User.findOne({ email: email }, async (err, doc) => {
    if (err) { return cb(err, null); }
    if (!doc) {
      const newUser = new User({ googleId: profile.id, username: profile.name.givenName });
      await newUser.save();
      cb(null, newUser);
    } 
    console.log('doc: '+doc);
    cb(null, doc);
  })
}


passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, verifyCallbackToLocal));
passport.use(new FacebookStrategy({
  clientID: '161620452646096',//FACEBOOK.clientID,
  clientSecret: '5decf4db929e56a089372022fb47cb7c',//FACEBOOK.clientSecret ,
  callbackURL: "/auth/facebook/callback",
  //  profileFields: ['id', 'displayName', 'photos', 'email']
}, verifyCallbackToFacebook));

passport.use(new GoogleStrategy({
  clientID: '702271930565-uuumi1db19csujberefugrq67t2eb6g7.apps.googleusercontent.com',
  clientSecret: 'JF0ai0B68YsBaLOKYOWJFIPw',
  callbackURL: "/auth/google/callback"
}, verifyCallbackToGoogle));


passport.serializeUser((user, done) => {
  console.log('serializeUser ' + user);
  done(null, user);
});

passport.deserializeUser((userId, done) => {
  console.log('deserializeUser');
  User.findById(userId)
    .then((user) => { done(null, user); })
    .catch(err => done(err))
});




//----------------------------------------------------------------
/*passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackURL: "http://loca;Host:4000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));
*/