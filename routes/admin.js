// eslint-disable-next-line new-cap
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');

const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('message', 'Log in to account or register first');
    res.redirect('/');
  } else {
    if (req.user.isAdmin) {
      return next();
    }
    req.flash('message', 'Accessible for admins only.');
    res.redirect('/');
  }
};

router.get('/', isAdmin, (req, res) => {
  res.render('pages/admin', {message: req.flash('message')});
});

router.post('/', isAdmin, (req, res, next) => {
  User.findById(req.body.userId, {isAdmin: true})
  .then((user) => {
    if (!user) {
      return next(err);
    } else {
      console.log(user);
      user.isAdmin = true;
      user.save()
      .then((user) => {
        if (!user) {
          return next(err);
        } else {
          req.flash('message', 'User ' + req.body.userId +
            ' email - ' + user.email + ' now has admin status');
          res.redirect('/admin');
        }
      }).catch(next);
    }
  }).catch(next);
});

module.exports = router;
