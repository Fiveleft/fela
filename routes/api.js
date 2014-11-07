  // api.js
var express = require('express'),
    request = require('request'),
    apicache = require('apicache'),
    phpUnserialize = require('php-unserialize'),
    urlBase = "http://cms.fiveleft.com/wordpress/api/";

var router  = express.Router(),
    cachetime = 1000*60*60*24*10,
    cacheDebug = true,
    cache   = apicache.options({debug:cacheDebug, defaultDuration:(cachetime)}).middleware;



function unserialize( json ) {
  for( var i=json.length-1; i!==-1; i-- ) {
    var p = json[i];
    if( p.custom_fields._meta ) {
      p.info = phpUnserialize.unserialize( p.custom_fields._meta );
      delete p.custom_fields._meta;
    }
  }
  return json;
}


function createProjectJSON( json ){

  var galleryPattern = /\?attachment_id=(\d+)/gi;

  for( var i=json.length-1; i!==-1; i-- ) {

    // Project JSON Object
    var pObj = json[i];
    var cf = pObj.custom_fields;

    // Convert custom_fields to "info" property;
    if( cf.description ) {
      pObj.info = {};
      for( var p in cf ) {
        pObj.info[p] = cf[p][0];
        if( p == "video_formats" && cf[p][0].length ) {
          pObj.info[p] = phpUnserialize.unserialize( cf[p][0] );
        }
      }
    }
    delete pObj.custom_fields;

    // Find any Gallery Info
    var gallery = pObj.content.match( galleryPattern );
    if( gallery !== null ) {
      pObj.gallery = gallery.join().replace( galleryPattern, '$1' );
    }
  }
  return json;
}



/* GET all projects */
router.get('/projects', cache(), function(req, res){
  var params = {
    url : urlBase + "get_posts/?post_type=fiveleft_project&posts_per_page=100&include=id,slug,title,content,custom_fields,categories,attachments",
    json : true
  };
  req.apicacheGroup = "project";
  request( params, function( err, response, body ){
    if( err ) return;
    res.send( createProjectJSON( body.posts ) );
  });
});



/* GET specific project */
router.get('/project/:id', cache(), function(req, res){
  var params = {
    url : urlBase + "get_post/?id=" + req.params.id + "&post_type=fiveleft_project&include=id,slug,title,content,custom_fields,categories,attachments",
    json : true
  };
  req.apicacheGroup = "project";
  request( params, function( err, response, body ){
    if( err ) return;
    var postJSON = createProjectJSON( [body.post] )
    console.log( " body.post.length : " + postJSON.length );
    res.send( postJSON );
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