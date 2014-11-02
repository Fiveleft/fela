var app = require('../app');
var express = require('express');
var router = express.Router();

// router.get( "/_escape_fragment_/*", function( request, response ) {

//   var script = path.join( __dirname, "get_html.js" );
//   var url = "http://localhost:8080" + request.url.replace( "_escape_fragment_", "#!" );
//   var childArgs = [
//       script, url
//   ];

//   childProcess.execFile( binPath, childArgs, function( err, stdout, stderr ) {
//     response.writeHead( 200, {
//       "Content-Type": "text/html; charset=UTF-8"
//     });
//     response.end( "<!doctype html><html>" + stdout + "</html>" );
//   });
// });


/* GET home page. */
router.get(['/','/work','/project/:slug','/connect','/info'], function(req, res) {
  res.render('index', { 
    title: 'Fiveleft is a Creative Digital Studio',
    cdn: app.locals.CDN
  });
});

module.exports = router;
