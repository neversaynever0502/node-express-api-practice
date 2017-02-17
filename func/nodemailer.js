'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'araja83946993@gmail.com',
        pass: 'k800502k'
    }
});

// let mailList ='neversaynever0502@gmail.com, araja83946993@gmail.com'
// let mailList = '';
// setup email data with unicode symbols


function sendMail(mailList,password){
    let mailOptions = {
        from: '"Member👻" <araja83946993@gmail.com>', // sender address
        to: mailList, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Welcome!', // plain text body
        html: '<a href="http://nodejs-express-practice2.herokuapp.com/members/confirm?email='+mailList+'&password='+password+'>confirm member</a><b>Nothing But Handsome Guy</b><br><img src="http://i.imgur.com/kqAIaDx.jpg"></img>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
}; 
// send mail with defined transport object
module.exports = function (mailAddress,password){
    let mailList = mailAddress;
    sendMail(mailList,password);
    
}