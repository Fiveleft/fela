var app         = require('../app');
var express     = require('express');
var request     = require('request');
var indexPaths  = ['/','/work','/project/:slug','/connect','/info'];
var router      = express.Router();

// Data to inject into index
var indexData   = {
  title: 'Fiveleft is a Creative Digital Studio',
  projects: {},
  partners : {},
  pageContent : {}
};

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


// Load Project Data
router.use( indexPaths, function(req, res, next){
  request( "http://localhost:" + app.get("port") + "/api/projects", function( err, response, body ){
    if( !err && response.statusCode == 200) {
      indexData.projects = body;
      next();
    }else{
      console.log( "could not load project data" );
    }
  });
});

// Load Partner Data
router.use( indexPaths, function(req, res, next){
  request( "http://localhost:" + app.get("port") + "/api/partners", function( err, response, body ){
    if( !err && response.statusCode == 200) {
      indexData.partners = body;
      next();
    }else{
      console.log( "could not load partner data" );
    }
  });
});

// Load Content Data
router.use( indexPaths, function(req, res, next){
  request( "http://localhost:" + app.get("port") + "/api/pagecontent", function( err, response, body ){
    if( !err && response.statusCode == 200) {
      indexData.pageContent = body;
      next();
    }else{
      console.log( "could not load page content data" );
    }
  });
});

/* GET home page. */
router.get( indexPaths, function(req, res) {
  indexData.cdn = app.locals.CDN;
  res.render('index', indexData);
});

module.exports = router;
