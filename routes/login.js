// eslint-disable-next-line new-cap
const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('pages/login', {message: req.flash('message')});
});

router.post('/', (req, res, next) => {
  passport.authenticate('localLogin', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.redirect('/login');
    } else {
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/profile');
      });
    }
  })(req, res, next);
});

module.exports = router;
