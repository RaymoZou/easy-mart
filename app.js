require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/catalog');
const mongoose = require('mongoose');

var app = express();

mongoose.connect(process.env.MONGODB_URI);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
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
