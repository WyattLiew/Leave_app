const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// DB Connect String   
var connect = require('../config/keys').mongoURI;

const pool = new Pool({
    connectionString:connect,
});


// get all leave balance
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


module.exports = router;