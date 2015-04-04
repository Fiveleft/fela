// file routes/common.js
var express     = require('express');
var nodemailer  = require('nodemailer');
var router      = express.Router();
var config      = require('../config-env.json');


// @see http://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html
// notasecret

router.post('/send-inquiry', function (req, res) {

  // create reusable transport method (opens pool of SMTP connections)
  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: config.connectForm
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: req.body.name, // sender address,
    sender: req.body.email,
    replyTo: req.body.name + " <" + req.body.email + ">",
    to: "studio@fiveleft.com", // list of receivers
    subject: "Fiveleft website inquiry: " + req.body.inquiry, // Subject line
    text: req.body.message, // plaintext body
    html: "<b>" + req.body.message + "</b>" // html body
  };

  // console.log( JSON.stringify(mailOptions) );

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      res.send( error );
    }else{
      res.send( response );
    }
  });
  
});

module.exports = router;  