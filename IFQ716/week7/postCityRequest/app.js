var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const options = require("./knexfile.js");
const knex = require("knex")(options);
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");
require("dotenv").config();

const helmet = require("helmet");

var app = express();

const authorization = require("./middleware/authorization");
// Set up JWT secret and expiration
// const jwtSecret = process.env.JWT_SECRET
const expires_in = 60 * 60 * 24;
const exp = Math.floor(Date.now() / 1000) + expires_in;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.db = knex;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cors());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
