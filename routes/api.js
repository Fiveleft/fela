// api.js
var express = require('express'),
    request = require('request'),
    apicache = require('apicache'),
    urlBase = "http://cms.fiveleft.com/wordpress/api/";

var router  = express.Router(),
    cache   = apicache.options({debug:true}).middleware,
    ttl     = "10 days";



/* GET all projects */
router.get('/projects', cache( ttl ), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type=fiveleft_project&posts_per_page=100&custom_fields=_meta&include=id,slug,title,content,custom_fields,modified,attachments,thumbnail,thumbnail_images",
    json : true
  };
  req.apicacheGroup = "project";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( body.posts );
  });
});


/* GET specific project */
router.get('/project/:id', cache( ttl ), function(req, res){
  var params = {
    url : urlBase + "get_post/?id=" + req.params.id + "&post_type=fiveleft_project&custom_fields=_meta",
    json : true
  };
  req.apicacheGroup = "project";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( body );
  });
});

/* GET specific project */
router.get('/clients', cache( ttl ), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type=fiveleft_client&posts_per_page=100&custom_fields=_meta&include=id,slug,title,custom_fields",
    json : true
  };
  req.apicacheGroup = "client";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( body.posts );
  });
});

/* GET specific project */
router.get('/agencies', cache( ttl ), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type=fiveleft_agency&posts_per_page=100&custom_fields=_meta&include=id,slug,title,custom_fields",
    json : true
  };
  req.apicacheGroup = "agency";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( body.posts );
  });
});

/* GET all site pages */
router.get('/sitecontent', cache( ttl ), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type=page&posts_per_page=100&include=id,slug,title,content,attachments,custom_fields",
    json : true
  };
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( body );
  });
});

// GET apicache index (for the curious)
router.get('/cache/index', function(req, res) {
  res.send(apicache.getIndex());
});

// Clear apicache
router.get('/cache/clear/:key?', function(req, res) {
  res.send(200, apicache.clear(req.params.key || req.query.key));
});


module.exports = router;