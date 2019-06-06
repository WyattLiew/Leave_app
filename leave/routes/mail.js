const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
require('dotenv').config();

// DB Connect String   
var connect = require('../config/keys').mongoURI;

const pool = new Pool({
    connectionString:connect,
});

router.post('/send-mail',(req,res)=>{
    const output = `
        <p>You have a new leave request</p>
        <h3>Request Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Leave Type: ${req.body.leave}</li>
            <li>From: ${req.body.fromDate}</li>
            <li>To: ${req.body.toDate}</li>
            <li>Number of days: ${req.body.days}</li>
            <li>Reason: ${req.body.reason}</li>
        </ul>
        <p>Please login to Leave App to approve/reject the request.</p>
    `;
    const textOutput = `
        You have a new leave request
        Request Details
        
        Name: ${req.body.name}
        Leave Type: ${req.body.leave}
        From: ${req.body.fromDate}
        To: ${req.body.toDate}
        Number of days: ${req.body.days}
        Reason: ${req.body.reason}
    `;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        //port: 465,
        //secure: true,
        auth: {
            user:'dev_stepapp@hotmail.com',
            pass:'step1234567890'                    
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
    from: '"no-reply" <dev_stepapp@hotmail.com>', // sender address
    to: "weijunn@hotmail.com", // list of receivers
    subject: "✔ New Leave Requests", // Subject line
    text: textOutput, // plain text body
    html: output // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

});

router.post('/send-resetPassword',(req,res)=>{
    var randomCode = Math.floor(1000 + Math.random() * 9000);
    console.log(randomCode);
    var emailAddress = req.body.email;
    const output = `
        <p>You have a reset password request</p>
        <h3>Request Details</h3>
        <ul>
            <li>User: ${req.body.email}</li>
            <li>Pin: ${randomCode}</li>
            
        </ul>
        <p>This ${randomCode} is your 4 digit Pin number.</p>
        <p>If you did not effect this, Please contact your admin.</p>
    `;
    const textOutput = `
        <p>You have a reset password request</p>
        <h3>Request Details</h3>
        <ul>
            <li>User: ${req.body.email}</li>
            <li>Pin: ${randomCode}</li>
        </ul>
        <p>This ${randomCode} is your 4 digit Pin number.</p>
    `;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     //host: 'smtp.gmail.com',
    //     auth: {
    //          user:process.env.USER,
    //          pass:process.env.PASSWORD                    
    //     }
    // });
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        //port: 465,
        //secure: true,
        auth: {
            user:'dev_stepapp@hotmail.com',
            pass:'step1234567890'                    
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
    from: '"no-reply" <dev_stepapp@hotmail.com>', // sender address
    to: emailAddress, // list of receivers
    subject: "✔ Reset Password Requests", // Subject line
    text: textOutput, // plain text body
    html: output // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    var valid = true;

    pool.connect((err,client,done)=>{
        if(err) return console.error('error running query', err);
        client.query('INSERT INTO account_validation(reset_email,pin,valid) VALUES($1,$2,$3)',
        [emailAddress,randomCode,valid],function(err, result) {
            done();
            if(err) {
                //console.error('error running query', err);
                pool.connect((err,client,done)=>{
                    if(err) return console.error('error running query', err);
                    client.query('UPDATE account_validation SET pin =$1 WHERE reset_email =$2',
                    [randomCode,emailAddress],function(err, result) {
                        done();
                        if(err) {
                            return console.error('error running query', err);
                        }
                    });
                });
            }
        });
    });

});

module.exports = router;