const express = require("express"),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    { Pool } = require('pg'),
    app = express();

// DB Connect String   
var connect = require('./config/keys').mongoURI;

const pool = new Pool({
    connectionString:connect,
});

app.get('/',function(req,res){
    // connect to postgres 
    pool.connect()
    .then(()=> console.log("Connected successfully"))
    .then(()=> pool.query('SELECT * FROM leave_balance', function(err, result) {
        if(err) {
         return console.error('error running query', err);
        }
        console.log('Rendering index');
        console.log(result.rows);
        data = result.rows;
        res.send(data);
        //res.render('App', {recipes: result.rows});
       }))
    .catch(e => console.log(e))
    //.finally(() => //pool.end());  
});

app.get('/api/get_all_leaves',function(req,res){
    // connect to postgres 
    pool.connect()
    .then(()=> console.log("Connected successfully"))
    .then(()=> pool.query('SELECT * FROM leave_balance', function(err, result) {
        if(err) {
         return console.error('error running query', err);
        }else{
       return res.json({
           data:result.rows
       })
        }
       }))
    .catch(e => console.log(e))
});

app.get('/api/get_leaves/:id',function(req,res){
    // connect to postgres 
    pool.connect()
    .then(()=> console.log("Connected successfully"))
    .then(()=> pool.query('SELECT * FROM leave_balance WHERE employee_id =$1',[req.params.id], function(err, result) {
        if(err) {
         return console.error('error running query', err);
        }else{
       return res.json({
           data:result.rows
       })
        }
       }))
    .catch(e => console.log(e))
});

const port = process.env.PORT || 5000;

// Server
app.listen(port, function(){
    console.log(`Server Started On Port ${port}`);    
});