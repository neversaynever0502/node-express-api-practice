var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var members = require('./routes/members'); //routes are defined here
var index = require('./routes/index');
var users = require('./routes/users');
var apis = require('./routes/apis');
var bots = require('./routes/bots');


var app = express();


//connect to our database
//Ideally you will obtain DB details from a config file
// var dbName = 'memberDB';
// var connectionString = 'mongodb://localhost:27017/'+dbName;
var connectionString = 'mongodb://user:123456@ds153669.mlab.com:53669/practice123';


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
app.use('/newapi', members); //This is our route middleware
app.use('/', index.memberAll);
app.use('/users', users);
app.use('/bot',bots);


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
