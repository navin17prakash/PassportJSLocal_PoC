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

passport.use('local',new passportLocal.Strategy(function (username , password, done) {
    //Database call to verify the user name matches with the password 
    //mocking the verification process now as if username ===  password then it is verified
    
    if(username === password){
        done(null, {id : username , name : username});
    }
    else { done(null, null);}
    
}));

passport.serializeUser(function (user, done ) {
    done(null,user.id);
    
});

passport.deserializeUser(function (id, done) {
    //Query the DB or Cache
    done(null, {id: id, name : id });
    
});
expressApp.get('/',function homeroute(request, response) {
    response.render('index',{name : request.user, 
     isAuthenticated : request.isAuthenticated()});
    
});

expressApp.get('/login',function loginroute(request, response) {
    response.render('login');
    
});

expressApp.post('/login', passport.authenticate('local'), function(request, response){
    response.redirect('/'); // Redirrect to the login page 
    
});

expressApp.get('/api/getdata',function(request, response){
    //This function is yet to be written. It adds an authroisded route ie an API which provides some data to a user if he has successfully logged on      
    
    
});
expressApp.listen(port);
console.log('listening on port '+ port);

