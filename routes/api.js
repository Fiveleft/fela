// api.js
var express = require('express'),
    request = require('request'),
    apicache = require('apicache'),
    phpUnserialize = require('php-unserialize'),
    urlBase = "http://cms.fiveleft.com/wordpress/api/";

var router  = express.Router(),
    cache   = apicache.options({debug:true, defaultDuration:(1000*60*60*24*10)}).middleware,
    ttl     = "10 days";



function unserialize( json ) {
  for( var i=json.length-1; i!==-1; i-- ) {
    var p = json[i];
    p.info = phpUnserialize.unserialize( p.custom_fields._meta[0] );
    delete p.custom_fields;
  }
  return json;
}



/* GET all projects */
router.get('/projects', cache(), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type=fiveleft_project&posts_per_page=100&custom_fields=_meta&include=id,slug,title,content,custom_fields,modified,attachments,thumbnail,thumbnail_images",
    json : true
  };
  req.apicacheGroup = "project";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( unserialize( body.posts ) );
  });
});



/* GET specific project */
router.get('/project/:id', cache(), function(req, res){
  var params = {
    url : urlBase + "get_post/?id=" + req.params.id + "&post_type=fiveleft_project&custom_fields=_meta",
    json : true
  };
  req.apicacheGroup = "project";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( unserialize( body.posts ) );
  });
});



/* GET partners */
router.get('/partners', cache(), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type[]=fiveleft_client&post_type[]=fiveleft_agency&posts_per_page=200&custom_fields=_meta&include=id,slug,title,custom_fields,type",
    json : true
  };
  req.apicacheGroup = "partners";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( unserialize( body.posts ) );
  });
});



/* GET specific project */
router.get('/clients', cache(), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type=fiveleft_client&posts_per_page=100&custom_fields=_meta&include=id,slug,title,custom_fields",
    json : true
  };
  req.apicacheGroup = "client";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( unserialize( body.posts ) );
  });
});



/* GET specific project */
router.get('/agencies', cache(), function(req, res){
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
router.get('/pagecontent', cache(), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type=page&posts_per_page=100&include=id,slug,title,content,attachments,custom_fields",
    json : true
  };
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( body.posts );
  });
});

// GET apicache index (for the curious)
router.get('/cache/index', function(req, res) {
  res.send(apicache.getIndex());
});

// Clear apicache
router.get('/cache/clear/:key?', function(req, res) {
  res.status(200).send(apicache.clear(req.params.key || req.query.key));
});


module.exports = router;