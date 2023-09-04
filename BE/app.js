var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cors({
    origin: 'http://localhost:3002',
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/sessions', sessionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// cors
app.use(function (req, res, next) {
  const allowedOrigins = ['localhost:3000, localhost:3002'];
  const reqHost = req.get('origin');
  let allowedHost = '';

  allowedOrigins.forEach((ao) => {
    if (reqHost && reqHost.endsWith(ao) === true) {
      allowedHost = reqHost;
    }
  });

  res.header('Access-Control-Allow-Origin', allowedHost);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Authorization, Accept, Content-Length, X-Requested-With'
  );
  next();
});

app.options('/*', function (req, res, next) {
  const allowedOrigins = ['localhost:3000', 'localhost:3002'];
  const reqHost = req.get('origin');
  let allowedHost = '';

  allowedOrigins.forEach((ao) => {
    if (reqHost && reqHost.endsWith(ao) === true) {
      allowedHost = reqHost;
    }
  });

  res.header('Access-Control-Allow-Origin', allowedHost);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  res.send(200);
});

module.exports = app;
