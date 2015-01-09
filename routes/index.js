var app         = require('../app');
var express     = require('express');
var request     = require('request');
var indexPaths  = ['/','/work','/project/:slug','/connect','/info'];
var router      = express.Router();
var _           = require('underscore');
var devEnv      = app.get('env') === 'development';

// Data to inject into index
var indexData   = {
  title: 'Fiveleft is a Creative Digital Studio',
  assets : {
    styles: (devEnv ? '/css/main.css' : '/css/main.min.css'),
    modernizr: (devEnv ? '/js/modernizr.custom.js' : '/js/modernizr.min.js'),
    requirejs: (devEnv ? '/js/vendor/requirejs/require.js' : '/js/require.min.js'),
  },
  data : {},
  agencyData : {},
  clientData : {},
  infoData : {},
  projectData: {}
};

// Load Content Data
router.use( indexPaths, function(req, res, next){
  request( "http://localhost:" + app.get("port") + "/api/sitecontent", function( err, response, body ){
    if( !err && response.statusCode == 200) {

      var b = JSON.parse( body );
      var infoData = _.where( b, {type:"info_block"} );
      
      indexData.data = body;
      indexData.agencyData = _.where( b, {type:"fiveleft_agency"} );
      indexData.clientData = _.where( b, {type:"fiveleft_client"} );
      indexData.projectData = _.where( b, {type:"fiveleft_project"} );

      _.each( infoData, function(d){
        indexData.infoData[d.slug] = d;
      });

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
