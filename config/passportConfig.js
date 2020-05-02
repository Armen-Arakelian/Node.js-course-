const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bCrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const passport = require('passport');
const googleOauthConfig = require('./googleOauthConfig');

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    done(null, id);
  } else {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  }
});

passport.use('localLogin', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email',
}, (req, email, password, done) => {
  User.findOne({email: email})
  .then((user) => {
    if (!user) {
      return done(null, false, req.flash('message', 'No user with such email'));
    }
    if (!isValidPassword(user, password)) {
      return done(null, false, req.flash('message', 'Invalid password'));
    }
    return done(null, user);
  })
  .catch((err) => {
    done(err);
  });
}));

passport.use('google', new GoogleStrategy({
  clientID: googleOauthConfig.clientID,
  clientSecret: googleOauthConfig.clientSecret,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true,
},
(req, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  return done(null, profile);
}));
