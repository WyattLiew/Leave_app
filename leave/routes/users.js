const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { Pool } = require('pg');

// DB Connect String   
var connect = require('../config/keys').mongoURI;

const pool = new Pool({
    connectionString:connect,
});

// Register Form
router.get('/register', (req,res) => {
    // res.render('register');
});

// Register Proccess
router.post('/register', function(req,res){
    const name = req.body.name;
    const username = req.body.email;
    const mobile = req.body.mobile;
    const department = req.body.department;
    const password = req.body.password;
    const password2 = req.body.passowrd2;
    const dateHired = req.body.dateHired;
    const isAdmin = req.body.isAdmin;
    const isManagement = req.body.isManagement;
    

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('mobile', 'Mobile is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    req.checkBody('dateHired','Date is required').notEmpty();
    req.checkBody('department','Department is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        console.log(errors.msg);
    }else{
        let newUser = {
            name:name,
            username:username,
            mobile:mobile,
            dateHired:dateHired,
            isAdmin:isAdmin,
            isManagement:isManagement,
            password:password,
            department:department
        };

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                console.log(newUser);
                pool.connect((err,client,done)=>{
                    if(err) return console.error('error running query', err);
                client.query('INSERT INTO employee(employee_name,employee_email,employee_mobile,employee_dept,employee_date_hired,password,isadmin,ismanagement) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
                [newUser.name,newUser.username,newUser.mobile,newUser.department,newUser.dateHired,newUser.password,newUser.isAdmin,newUser.isManagement], function(err, result) {
                    done();
                        if(err) {
                            return console.error('error running query', err);
                        }
                });
            });
                
            });
        });
    }
});

// Modified employee details
router.post('/modified_employee_details', function(req,res){
    const id = req.body.id;
    const name = req.body.name;
    const username = req.body.email;
    const mobile = req.body.mobile;
    const department = req.body.department;
    const isAdmin = req.body.isAdmin;
    const isManagement = req.body.isManagement;
    

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('mobile', 'Mobile is required').notEmpty();
    req.checkBody('department','Department is required').notEmpty();

    let errors = req.validationErrors();

    if(errors){
        console.log(errors.msg);
    }else{
        let newUser = {
            empId:id,
            name:name,
            username:username,
            mobile:mobile,
            isAdmin:isAdmin,
            isManagement:isManagement,
            department:department
        };
        console.log(newUser);
        pool.connect((err,client,done)=>{
            if(err) return console.error('error running query', err);
            client.query('UPDATE employee SET employee_name=$1, employee_email=$2, employee_mobile=$3, employee_dept=$4,isadmin=$5, ismanagement=$6 WHERE id=$7',
            [newUser.name,newUser.username,newUser.mobile,newUser.department,newUser.isAdmin,newUser.isManagement,newUser.empId], function(err, result) {
                    done();
                        if(err) {
                            return console.error('error running query', err);
                        }
                });
            });
        }
});

// Delete employee data (indivisual)
router.delete('/api/delete_individual_employee_data/:id',function(req,res){
    // connect to postgres 
    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
        client.query('DELETE FROM employee WHERE id = $1',[req.params.id], function(err, result) {
                done();
                    if(err) {
                        return console.error('error running query', err);
                    } else {
                        res.redirect('/');
                    }
            });
        });
});

// Login Form
router.get('/login', (req,res,next)=>{
    res.redirect('/');
});

// Login Proccess
// router.post('/login', (req,res,next)=>{
//     passport.authenticate('local',{
//         successRedirect:'/leavepage',
//         failureRedirect:'/login',
//         //failureFlash:true)
//     })(req,res,next);
// });

router.post('/login', passport.authenticate('local'),(req,res,next)=>{
        console.log("passport user", req.user);
        if(req.user.isUser && req.user.isAdmin){
           res.redirect('/admin');
        }else if(req.user.isUser && !req.user.isAdmin){
            res.redirect('/MainDashboard');
        }else{
            res.redirect('/');
        }
     });



// Logout
router.get('/logout', function(req,res){
    req.logout();
    console.log('success','you are logged out');
    res.redirect('/');
});

module.exports = router;