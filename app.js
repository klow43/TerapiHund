var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const hjemRouter = require('./routes/hjem');
const omossRouter = require('./routes/omoss');
const terapihundenRouter = require('./routes/terapihund');
const lenkerRouter = require('./routes/lenker');
const tilbyrRouter = require('./routes/tilbyr');
const ipressenRouter = require('./routes/ipressen');
const kontaktRouter = require('./routes/kontakt');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', hjemRouter);
app.use('/omoss', omossRouter);
app.use('/terapihund', terapihundenRouter);
app.use('/lenker', lenkerRouter);
app.use('/tilbyr', tilbyrRouter);
app.use('/ipressen', ipressenRouter);
app.use('/kontakt', kontaktRouter);


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
