

var nodemailer = require('nodemailer');

var mailOpts, smtpTrans;

//Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
smtpTrans = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    XOAuth2: {
        user: "1038863419892-mg4gspdvqob4h27fsg238k5ktk3td92s@developer.gserviceaccount.com",
        // user: "studio@fiveleft.com",
        clientId: "1038863419892-mg4gspdvqob4h27fsg238k5ktk3td92s.apps.googleusercontent.com",
        clientSecret: "nXfJn-qkocxuAEU9LJOfHWRw",
        refreshToken: "1/B7YuqRvo7n3t36QeS-QsYDo4jI9D_M_9os9ujrDQyyA",
        accessToken: "ya29._ADqY5G_aTPLw-gOFhfWG3EQqyIbY77JtxLoyNMxv-q_qa6Xzbnq_oiHI--S-4KVgFnTbwARYiuoBQ",
        timeout: 3600
    }
    // user: "1038863419892-mg4gspdvqob4h27fsg238k5ktk3td92s@developer.gserviceaccount.com",
    // password: "s3v3nr!ght",
  }
});

//Mail options
mailOpts = {
  // from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
  from: 'ck@fiveleft.com',
  to: 'studio@fiveleft.com',
  subject: 'Fiveleft.com website contact form',
  text: "Hello World!",
  // text: req.body.message
};

// 
console.log( smtpTrans, mailOpts );

// Send mail
smtpTrans.sendMail(mailOpts, function (error, response, status) {
  //Email not sent
  if (error) {
    console.log( error );
    // res.status( status ).send({ 
    //   title: 'Raging Flame Laboratory - Contact', 
    //   msg: 'Error occured, message not sent.', 
    //   err: true, 
    //   page: 'contact' 
    // });
  }else {
    console.log( response, status );
    // res.status( status ).send({ 
    //   title: 'Raging Flame Laboratory - Contact', 
    //   msg: 'Message sent! Thank you.', 
    //   err: false, 
    //   page: 'contact' 
    // });
  }
});