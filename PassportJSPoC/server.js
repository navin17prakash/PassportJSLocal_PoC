var express = require('express');
var morgan = require('morgan');

var passport = require('passport');
var passportLocal = require('passport-local');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');


var port = 3000;
var expressApp = express();

expressApp.use(cookieParser());
expressApp.use(bodyParser.urlencoded({extended :false}));
expressApp.use(expressSession({secret : "secret",
                               resave : false,
                               saveUninitialized : false                     
                                 }));

expressApp.set('view engine','ejs');
expressApp.use(passport.initialize());
expressApp.use(passport.session());


expressApp.get('/',function homeroute(request, response) {
    response.render('index',{name :'Gappy', isAuthenticated : false});
    //response.send('Hello I am navin');
});

expressApp.get('/login',function loginroute(request, response) {
    response.render('login');
})
expressApp.listen(port);
console.log('listening on port '+ port);

