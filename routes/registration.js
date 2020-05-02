const mongoose = require('mongoose');
const User = mongoose.model('user');
const bCrypt = require('bcrypt-nodejs');

// eslint-disable-next-line new-cap
const router = require('express').Router();

const encryptePassword = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};

router.get('/', (req, res) => {
  res.render('pages/registration', {message: req.flash('message')});
});

router.post('/', (req, res, next) => {
  User.findOne({'email': req.body.email})
  .then((user) => {
    if (user) {
      req.flash('message', 'User with this email already exists');
      res.redirect('/registration');
    } else {
      const newUser = new User({
        email: req.body.email,
        password: encryptePassword(req.body.password),
        name: req.body.name,
      });
      newUser.save()
      .then((user) => {
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          req.flash('message', 'User ' + newUser.email + ' created');
          res.redirect('/profile');
        });
      }).catch(next);
    }
  }).catch(next);
});

module.exports = router;
