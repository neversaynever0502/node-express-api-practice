var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var movies = require('./routes/movies'); //routes are defined here
var index = require('./routes/index');
var users = require('./routes/users');
var apis = require('./routes/apis');

var app = express();


//connect to our database
//Ideally you will obtain DB details from a config file
// var dbName = 'movieDB';
var connectionString = 'mongodb://heroku_gfnbbswz:a2hc4h5083sl9o842h7sjk2asb@ds153659.mlab.com:53659/heroku_gfnbbswz';

mongoose.connect(connectionString);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',apis);
app.use('/movie', movies); //This is our route middleware
app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
