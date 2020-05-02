module.exports = {
  secret: 'Top secret',
  key: 'keys',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null,
  },
  saveUninitialized: false,
  resave: false,
  // to add store: ..
};
