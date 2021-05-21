var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

const { User, Profile } = require('./routes/routes');

var app = express();

const configDB = require('./config/mongodb');

// Configuration ==============================================================
mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// For passport
app.use(session({ secret: 'siaputraresidence15229' }));
app.use(passport.initialize());
app.use(passport.session());

// Routes =====================================================================
app.use('/user', User);
app.use('/profile', Profile);

var server = app.listen(3000, function () {
  console.log("Calling app.listen's callback function.");
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
