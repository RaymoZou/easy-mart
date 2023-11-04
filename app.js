require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/catalog');
var session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./utils/passport');

const userController = require('./controllers/userController');
const bcrypt = require('bcrypt');
const User = require('./models/user');

var app = express();

// express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName: 'storeDB'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// TODO: create router for login & signup routes
// that are accessible to non-users
app.get('/login', (req, res) => {
  res.render('login', { title: "Login" });
});

app.get('/signup', (req, res) => {
  res.render('signup', { title: "Sign Up" });
});

app.get('/logout', userController.logout);

// POST routes
app.post('/login', userController.verify_user);

// salt plain-text password with 10 salt rounds and store hash in database
app.post('/signup', async function (req, res, next) {
  try {
    const username = req.body.username;
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ username, hash });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
});

app.use('/', passport.isAuthenticated, indexRouter);
app.use('/category', passport.isAuthenticated, categoryRouter);

app.use((req, res, next) => {
  const err = createError(404, `The requested resource was not found`);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status).render('error', { message: err.message, error: err })
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`);
})
