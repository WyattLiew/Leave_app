const express = require("express"),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    passport = require('passport'),
    expressValidator = require('express-validator'),
    session =require('express-session'),
    { Pool } = require('pg'),
    app = express();

// DB Connect String   
var connect = require('./config/keys').mongoURI;

const pool = new Pool({
    connectionString:connect,
});

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Express Validator Middleware
app.use(expressValidator());

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('/',function(req,res){
    // Login page
    
});


// Route Files
app.use('',require('./routes/leaves'));
app.use('',require('./routes/users'));
app.use('',require('./routes/admin'));

const port = process.env.PORT || 5000;

// Server
app.listen(port, function(){
    console.log(`Server Started On Port ${port}`);    
});