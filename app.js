const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const sessions = require('express-session');
const MongoStore = require('connect-mongo')(sessions);
const flash = require('connect-flash');
const path = require('path');
const configDb = require('./config/configDb');
const configSessions = require('./config/configSessions');

mongoose.Promise = global.Promise;
mongoose.connect(configDb.url, {useNewUrlParser: true});
require('./dbModels/user');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

configSessions.store =
  new MongoStore({mongooseConnection: mongoose.connection});
app.use(sessions(configSessions));

app.use(flash());

require('./config/passportConfig');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/registration', require('./routes/registration'));
app.use('/login', require('./routes/login'));
app.use('/auth/google', require('./routes/authGoogle'));
app.use('/admin', require('./routes/admin'));

app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {message: err.message, error: err});
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running ' + server.address().port);
});
