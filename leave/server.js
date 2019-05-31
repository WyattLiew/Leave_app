const express = require("express"),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    passport = require('passport'),
    expressValidator = require('express-validator'),
    session =require('express-session'),
    { Pool } = require('pg'),
    app = express();
    require('dotenv').config();

// DB Connect String   
var connect = require('./config/keys').mongoURI;

const pool = new Pool({
    connectionString:connect,
});
app.use(express.static(path.resolve(__dirname,'client/build')));
app.set('trust proxy', 1);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Express Validator Middleware
app.use(expressValidator());

// Express Session Middleware
app.use(session({
    store: new (require('connect-pg-simple')(session))({
        pool : pool,
        tableName : 'session'
    }),
    secret: 'sHsHsHItsSecrettvvmma',
    resave: false,
    saveUninitialized: false,
    name:'sessionId',
    cookie: {   secure: false,
                expires: new Date(Date.now() + 60 * 10000), 
                maxAge: 60*10000 }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Route Files
app.use('',require('./routes/leaves'));
app.use('',require('./routes/users'));
app.use('',require('./routes/admin'));
app.use('',require('./routes/mail.js'));

app.get('*',function(req,res){
    // Login page
    res.sendFile(path.join(__dirname,'client/build','index.html'),function(err){
        if (err) {
            res.status(500).send(err)
          }
    });
});


const port = process.env.PORT || 5000;

// Server
app.listen(port, function(){
    console.log(`Server Started On Port ${port}`);    
});