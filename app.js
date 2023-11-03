require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/catalog');
var session = require('express-session');
const MongoStore = require('connect-mongo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/category', categoryRouter);

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
