const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// DB Connect String   
var connect = require('../config/keys').mongoURI;

const pool = new Pool({
    connectionString:connect,
});


// get all employee details
router.get('/api/get_all_employee',function(req,res){
    // connect to postgres 
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
            client.query('SELECT * FROM employee', function(err, result) {
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

// get individual employee details
router.get('/api/get_individual_employee/:id',function(req,res){
    // connect to postgres 
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
            client.query('SELECT * FROM employee WHERE id=$1',[req.params.id], function(err, result) {
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

 // get employee indivisual leave balance details
 router.get('/api/get_employee_all_leaves_balance/:id',function(req,res){
    // connect to postgres  
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
            client.query('SELECT * FROM leave_balance t1 inner JOIN employee t2 on t1.employee_id = t2.id inner JOIN leave_type t3 on t1.leave_type_code = t3.leave_type_code WHERE employee_id =$1',[req.params.id], function(err, result) {
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

// insert leave for new user
router.post('/update_employee_new_details',function(req,res){
    // connect to postgres 

    console.log(req.body.id);
    console.log(req.body.updatedDate);
    // console.log(req.body.year);
    // console.log(req.body.leave1_1);
    // console.log(req.body.leave1_2);
    // console.log(req.body.leave1_3);
    // console.log(req.body.leave2_1);
    // console.log(req.body.leave2_2);
    // console.log(req.body.leave2_3);
    // console.log(req.body.leave3_1);
    // console.log(req.body.leave3_2);
    // console.log(req.body.leave3_3);
    // console.log(req.body.leave4_1);
    // console.log(req.body.leave4_2);
    // console.log(req.body.leave4_3);
    // console.log(req.body.leave5_1);
    // console.log(req.body.leave5_2);
    // console.log(req.body.leave5_3);
    // console.log(req.body.leave6_1);
    // console.log(req.body.leave6_2);
    // console.log(req.body.leave6_3);
    // console.log(req.body.leave7_1);
    // console.log(req.body.leave7_2);
    // console.log(req.body.leave7_3);
    // console.log(req.body.leave8_1);
    // console.log(req.body.leave8_2);
    // console.log(req.body.leave8_3);
    // console.log(req.body.leave9_1);
    // console.log(req.body.leave9_2);
    // console.log(req.body.leave9_3);
    // console.log(req.body.leave10_1);
    // console.log(req.body.leave10_2);
    // console.log(req.body.leave10_3);

    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
        client.query('INSERT INTO leave_balance(employee_id,leave_type_code,year_number,updated,leave_balance,leave_taken,leave_remaining) VALUES($1,$2,$3,$4,$5,$6,$7),($8,$9,$10,$11,$12,$13,$14),($15,$16,$17,$18,$19,$20,$21),($22,$23,$24,$25,$26,$27,$28),($29,$30,$31,$32,$33,$34,$35),($36,$37,$38,$39,$40,$41,$42),($43,$44,$45,$46,$47,$48,$49),($50,$51,$52,$53,$54,$55,$56),($57,$58,$59,$60,$61,$62,$63),($64,$65,$66,$67,$68,$69,$70) RETURNING leave_balance_id',
        [req.body.id,'1',req.body.year,req.body.updatedDate,req.body.leave1_1,req.body.leave1_2,req.body.leave1_3,
        req.body.id,'2',req.body.year,req.body.updatedDate,req.body.leave2_1,req.body.leave2_2,req.body.leave2_3,
        req.body.id,'3',req.body.year,req.body.updatedDate,req.body.leave3_1,req.body.leave3_2,req.body.leave3_3,
        req.body.id,'4',req.body.year,req.body.updatedDate,req.body.leave4_1,req.body.leave4_2,req.body.leave4_3,
        req.body.id,'5',req.body.year,req.body.updatedDate,req.body.leave5_1,req.body.leave5_2,req.body.leave5_3,
        req.body.id,'6',req.body.year,req.body.updatedDate,req.body.leave6_1,req.body.leave6_2,req.body.leave6_3,
        req.body.id,'7',req.body.year,req.body.updatedDate,req.body.leave7_1,req.body.leave7_2,req.body.leave7_3,
        req.body.id,'8',req.body.year,req.body.updatedDate,req.body.leave8_1,req.body.leave8_2,req.body.leave8_3,
        req.body.id,'9',req.body.year,req.body.updatedDate,req.body.leave9_1,req.body.leave9_2,req.body.leave9_3,
        req.body.id,'10',req.body.year,req.body.updatedDate,req.body.leave10_1,req.body.leave10_2,req.body.leave10_3],function(err, result) {
            done();
            if(err) {
                return console.error('error running query', err);
            }
        });
    });
    res.redirect('/');
    //pool.end();
});


/**
 * 
 * Edit Leave balance
 * 
 */

// get individual employee leave Balance
router.get('/api/get_individual_employee_leave_balance/:id',function(req,res){
    // connect to postgres 
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
            client.query('SELECT * FROM leave_balance WHERE employee_id=$1',[req.params.id], function(err, result) {
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


module.exports = router;