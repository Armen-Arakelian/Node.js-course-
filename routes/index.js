// eslint-disable-next-line new-cap
const router = require('express').Router();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('message', 'Log in to account or register first');
  res.redirect('/');
};

router.get('/', (req, res) => {
  res.render('pages/index', {message: req.flash('message')});
});


router.get('/profile', isLoggedIn, (req, res) => {
  res.render('pages/profile', {user: req.user, message: req.flash('message')});
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('message', 'Successfuly logged out');
  res.redirect('/');
});

module.exports = router;
