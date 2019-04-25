const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// DB Connect String   
var connect = require('../config/keys').mongoURI;

const pool = new Pool({
    connectionString:connect,
});

// Apply leave
router.post('/apply-leave',function(req,res){
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
    console.log(req.body.id);
    const isapprove = 1;

    pool.query('INSERT INTO leave_taken(employee_id,leave_type_code,leave_from_date,leave_to_date,number_of_days,reason,leave_approval_code) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING leave_period_id',
    [req.body.id,req.body.leaveType,req.body.fromDate,req.body.toDate,req.body.days,req.body.reason,isapprove]);

    // Update leave Balance
    pool.query('UPDATE leave_balance SET leave_taken =$1, leave_remaining =$2, updated =$3 WHERE employee_id =$4 AND leave_balance_id =$5',
    [req.body.taken,req.body.remaining,req.body.currentDate,req.body.id,req.body.balanceID]);

    // pool.query('UPDATE leave_taken SET leave_from_date =$1, leave_to_date =$2, number_of_days =$3 WHERE employee_id =$4 AND leave_period_id =$5',
    // [req.body.fromDate,req.body.toDate,req.body.days,employee_id,isapprove]);
    res.redirect('/');
    //pool.end();
});

// get all leave balance
router.get('/api/get_all_leaves',function(req,res){
    // connect to postgres 
    pool.connect()
    .then(client=> console.log("Connected successfully"))
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
router.get('/api/get_leaves/:id',function(req,res){
    // connect to postgres 
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
            client.query('SELECT * FROM leave_balance JOIN leave_type USING(leave_type_code) WHERE employee_id = $1',[req.params.id], function(err, result) {
                done();// promise - checkout a client
                if(err) {
                    return console.error('error running query', err);
                }else{
                    return res.json({
                    data:result.rows
                });
            }
        }); 
    });
});

// get indivisual leave balance details
router.get('/api/get_leaves_balance/:id/:leaveType',function(req,res){
    // connect to postgres  
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
            client.query('SELECT employee_id,leave_balance_id,leave_balance,leave_taken,leave_remaining FROM leave_balance WHERE employee_id =$1 AND leave_type_code =$2',[req.params.id,req.params.leaveType], function(err, result) {
                done();
                if(err) {
                    return console.error('error running query', err);
                }else{
                    return res.json({
                    data:result.rows
                });
            }
        }); 
    });
});

// get leave taken history
router.get('/api/get_leaves_taken/:id',function(req,res){
    // connect to postgres 
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
            client.query('SELECT * FROM leave_taken t1 inner JOIN leave_type t2 on t1.leave_type_code = t2.leave_type_code inner join leave_approval t3 on t1.leave_approval_code = t3.leave_approval_id WHERE employee_id = $1',[req.params.id], function(err, result) {
                done();
                if(err) {
                    return console.error('error running query', err);
                }else{
                    return res.json({
                    data:result.rows
                });
            }
        }); 
    });
});

// get leave taken history (indivisual)
router.get('/api/get_leaves_taken_cancel/:id',function(req,res){
    // connect to postgres 
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
            client.query('SELECT * FROM leave_taken t1 inner JOIN leave_type t2 on t1.leave_type_code = t2.leave_type_code inner join leave_approval t3 on t1.leave_approval_code = t3.leave_approval_id WHERE leave_period_id = $1',[req.params.id], function(err, result) {
                done();
                if(err) {
                    return console.error('error running query', err);
                }else{
                    return res.json({
                    data:result.rows
                });
            }
        }); 
    });
});

// Update leave taken history (indivisual)
router.post('/api/update_leaves_taken',function(req,res){
    // connect to postgres 

    console.log("LT "+req.body.leaveType);
    console.log("D "+req.body.days);
    console.log("TA "+req.body.taken);
    console.log("RM "+req.body.remaining);
    console.log("cD "+req.body.currentDate);
    console.log("BID "+req.body.balanceID);
    console.log("ID "+req.body.employeeID);

    pool.connect();
    pool.query('UPDATE leave_balance SET leave_taken =$1, leave_remaining =$2, updated =$3 WHERE employee_id =$4 AND leave_balance_id =$5',
    [req.body.taken,req.body.remaining,req.body.currentDate,req.body.employeeID,req.body.balanceID]);
    // res.redirect('/');
});

// Delete leave taken history (indivisual)
router.delete('/api/delete_leaves_taken/:id',function(req,res){
    // connect to postgres 
    pool.connect();
    pool.query('DELETE FROM leave_taken WHERE leave_period_id = $1',[req.params.id]);
    res.redirect('/');
});

// (check user status is login)
router.get('/api/get_account_valification',ensureAuthenticated,function(req,res,next){
    console.log("Checking Account valification" );
});

// Check user status for nav bar
router.get('/api/check_user_status',ensureAuthStatus,function(req,res){ 
    console.log("Checking user status for nav bar");
    return res.json();         
});

// Check user id
router.get('/api/check_user_id',function(req,res){ 
    if(req.isAuthenticated()){
        console.log("Checking Account id");
        return res.json({
            data:req.user.userId
        });
    }  
});



/*
 * Check the request if the user is authenticated.
 * Return an error message if not, otherwise keep going :)
 */
// Access Control
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        console.log("User Account is Authenticated");
        return next();
    } else {
        console.log("User Account is fail Authenticated");
       res.redirect('/');
    }
}
// Access Control for nav bar
function ensureAuthStatus(req,res,next){
    if(req.isAuthenticated()){
        console.log("Nav bar showing now");
        return next();
    } else {
    console.log("Nav bar hidden");
    }
}



module.exports = router;