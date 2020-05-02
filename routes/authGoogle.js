const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const passport = require('passport');

router.get('/',
  passport.authenticate('google', {scope:
    ['https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read']}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/profile');
  });

module.exports = router;
