// file routes/common.js
var express     = require('express');
var nodemailer  = require('nodemailer');
var router      = express.Router();


// @see http://masashi-k.blogspot.com/2013/06/sending-mail-with-gmail-using-xoauth2.html
//
notasecret


router.post('/send-inquiry', function (req, res) {
  
  var mailOpts, smtpTrans;
  
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "studio@fiveleft.com",
      password: "s3v3nr!ght",
    }
  });

  //Mail options
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
    to: 'studio@fiveleft.com',
    subject: 'Fiveleft.com website contact form',
    text: req.body.message
  };

  // 
  console.log( smtpTrans, mailOpts );

  // Send mail
  smtpTrans.sendMail(mailOpts, function (error, response, status) {
    //Email not sent
    if (error) {
      console.log( error, response, status );
      res.status( status ).send({ 
        title: 'Raging Flame Laboratory - Contact', 
        msg: 'Error occured, message not sent.', 
        err: true, 
        page: 'contact' 
      });
    }else {
      console.log( response, status );
      res.status( status ).send({ 
        title: 'Raging Flame Laboratory - Contact', 
        msg: 'Message sent! Thank you.', 
        err: false, 
        page: 'contact' 
      });
    }
  });
  
});

module.exports = router;  