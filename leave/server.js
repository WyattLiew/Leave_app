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

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

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

// Apply leave
app.post('/apply-leave',function(req,res){
    // connect to postgres 
    pool.connect();
    console.log(req.body.reason);
    console.log(req.body.fromDate);
    console.log(req.body.toDate);
    console.log(req.body.leaveType);
    console.log(req.body.days);
    console.log(req.body.taken);
    console.log(req.body.remaining);
    console.log(req.body.currentDate);
    console.log(req.body.balanceID);
    const employee_id = 1,
          isapprove = 1;

    //pool.query('INSERT INTO leave_taken(employee_id,leave_type_code,leave_from_date,leave_to_date,number_of_days,reason,leave_approval_code) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING leave_period_id',
    //[employee_id,req.body.leaveType,req.body.fromDate,req.body.toDate,req.body.days,req.body.reason,isapprove]);

     pool.query('UPDATE leave_balance SET leave_taken =$1, leave_remaining =$2, updated =$3 WHERE employee_id =$4 AND leave_balance_id =$5',
     [req.body.taken,req.body.remaining,req.body.currentDate,employee_id,req.body.balanceID]);

    // pool.query('UPDATE leave_taken SET leave_from_date =$1, leave_to_date =$2, number_of_days =$3 WHERE employee_id =$4 AND leave_period_id =$5',
    // [req.body.fromDate,req.body.toDate,req.body.days,employee_id,isapprove]);
    res.redirect('/');
    //pool.end();
});

// get all leave balance
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

// get indivisual leave balance
app.get('/api/get_leaves/:id',function(req,res){
    // connect to postgres 
    pool.connect()
    .then(()=> console.log("Connected successfully"))
    //.then(()=> pool.query('SELECT * FROM leave_balance WHERE employee_id =$1',[req.params.id], function(err, result) {
    .then(()=> pool.query('SELECT * FROM leave_balance JOIN leave_type USING(leave_type_code) WHERE employee_id = $1',[req.params.id], function(err, result) {
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

// get indivisual leave balance details
app.get('/api/get_leaves_balance/:id/:leaveType',function(req,res){
    // connect to postgres 
    pool.connect()
    .then(()=> console.log("Connected successfully"))
    .then(()=> pool.query('SELECT leave_balance_id,leave_balance,leave_taken,leave_remaining FROM leave_balance WHERE employee_id =$1 AND leave_type_code =$2',[req.params.id,req.params.leaveType], function(err, result) {
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

app.get('/api/get_leaves_taken/:id',function(req,res){
    // connect to postgres 
    pool.connect()
    .then(()=> console.log("Connected successfully"))
    .then(()=> pool.query('SELECT * FROM leave_taken t1 inner JOIN leave_type t2 on t1.leave_type_code = t2.leave_type_code inner join leave_approval t3 on t1.leave_approval_code = t3.leave_approval_id WHERE employee_id = $1',[req.params.id], function(err, result) {
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