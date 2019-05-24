const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

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
        host: "smtp.gmail.com",
        auth: {
            user:'stepdbsg@gmail.com',
            pass:'step1234567890'                      
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
    from: '"no-reply" <stepdbsg@gmail.com>', // sender address
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

module.exports = router;