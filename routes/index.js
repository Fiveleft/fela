
var app         = require('../app');
var express     = require('express');
var request     = require('request');
var indexPaths  = ['/','/work','/project/:slug','/connect','/info'];
var router      = express.Router();
var _           = require('underscore');
var config      = require('../config-env.json');

// Data to inject into index
var indexData   = {
  title: 'Fiveleft is a Creative Digital Studio | Seattle WA',
  assets : {
    styles: '/css/main.css',
    modernizr: '/js/modernizr.custom.js',
    requirejs: '/js/vendor/requirejs/require.js',
    requireMain: '/js/init',
  },
  config : config,
  data : {},
  agencyData : {},
  clientData : {},
  infoData : {},
  projectData: {}
};


var prioritySort = function( a, b ){
  var ap = (a.hasOwnProperty('info') && a.info.hasOwnProperty('priority')) ? a.info.priority : 100,
    bp = (b.hasOwnProperty('info') && b.info.hasOwnProperty('priority')) ? b.info.priority : 100;
  return ap-bp;
};


// Load Content Data
router.use( indexPaths, function(req, res, next){

  var useCache = req.query.uncache === '1',
    apiRequest = "http://localhost:" + app.get("port") + "/api/sitecontent" + (useCache ? "?uncache=1" : "");

  request( apiRequest, function( err, response, body ){
    if( !err && response.statusCode == 200) {

      var b = JSON.parse( body );
      var infoData = _.where( b, {type:"info_block"} );
      
      indexData.data = body;
      indexData.agencyData = _.where( b, {type:"fiveleft_agency"} ).sort( prioritySort );
      indexData.clientData = _.where( b, {type:"fiveleft_client"} ).sort( prioritySort );
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

  if( app.get('env') === 'development' ) {
    app.locals.CDN = '/assets/';  
  }
  if( app.get('env') === 'production' ) {
    indexData.assets.modernizr = '/js/modernizr.min.js';
    indexData.assets.requirejs = '/js/require.min.js';
    indexData.assets.requireMain = "/js/init-min";
    indexData.assets.styles = '/css/main.min.css';
  }

  indexData.cdn = app.locals.CDN;

  res.render('index', indexData);
});

module.exports = router;
