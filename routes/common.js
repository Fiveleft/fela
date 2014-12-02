// file routes/common.js
var app         = require('../app');
var express     = require('express');
var request     = require('request');
var indexPaths  = ['/','/work','/project/:slug','/connect','/info'];
var router      = express.Router();


router.post('/contact', function (req, res) {
  
  var mailOpts, smtpTrans;
  
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: "studio@fiveleft.com",
      pass: "application-specific-password" 
    }
  });

  //Mail options
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
    to: 'studio@fiveleft.com',
    subject: 'Fiveleft.com website contact form',
    text: req.body.message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    //Email not sent
    if (error) {
      res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
    }
    //Yay!! Email sent
    else {
      res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
    }
  });
  
});

module.exports = router;