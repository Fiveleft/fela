  // api.js
var app = require('../app'),
    express = require('express'),
    request = require('request'),
    path = require('path'),
    fs = require('fs'),
    apicache = require('apicache'),
    _ = require('underscore'),
    phpUnserialize = require('php-unserialize'),
    urlBase = "http://cms.fiveleft.com/wordpress/api/";

var router  = express.Router(),
    cachetime = 1000*60*60*24*10,
    cacheDebug = true,
    siteContent,
    useCache = true,
    cache = apicache.options({debug:cacheDebug, defaultDuration:(cachetime)}).middleware,
    cacheFn = cache;



// function unserialize( json ) {
//   for( var i=json.length-1; i!==-1; i-- ) {
//     var p = json[i];
//     if( p.custom_fields._meta ) {
//       p.info = phpUnserialize.unserialize( p.custom_fields._meta );
//       delete p.custom_fields._meta;
//     }
//   }
//   return json;
// }


function cleanJSON( json ){

  var galleryPattern = /\?attachment_id=(\d+)/gi;
  var i = json.length-1;

  for( i; i!==-1; i-- ) {

    // Project JSON Object
    var pObj = json[i];
    var cf;
    var p;
    var gallery;
    

    if( !_.isEmpty( pObj.custom_fields ) ) {
      cf = pObj.custom_fields; 
      pObj.info = {};
      for( p in cf ) {
        if( !_.isEmpty( cf[p] ) ) {
          pObj.info[p] = cf[p][0];
        }
      }
      if( pObj.info.video_formats ) {
        pObj.info.video_formats = phpUnserialize.unserialize( pObj.info.video_formats );
      }
    }

    if( pObj.hasOwnProperty('custom_fields') ) {  
      delete pObj.custom_fields;
    }

    // Find any Gallery Info
    gallery = pObj.content.match( galleryPattern );
    if( gallery !== null ) {
      pObj.gallery = gallery.join().replace( galleryPattern, '$1' );
    }
  }
  return json;
}


router.use( ':uncache?', function(req, res, next){
  useCache = req.query.uncache !== '1';
  cacheFn = function(){ console.log('skipping cache'); };
  console.log( 'capturing uncache request' );
  next();
});


/* GET partners */
router.get('/sitecontent', cacheFn(), function(req, res){

  console.log( "***\nROUTE: SiteContent" );  
  console.log( "\t- environment:", app.get('env') );
  console.log( "\t- use cache? ", useCache );

  if (app.get('env') === 'development' && useCache ) {

    // IF we're in local dev and not requesting an 'uncache', load the local JSON
    console.log( "  - loading site content data from JSON file" );
    siteContent = require('../sitecontent.json');
    res.send( siteContent );

  } else {

    // ELSE we're live OR we're requesting an 'uncache'
    console.log("  - loading site content data from CMS " );
    
    var params = {
      url : urlBase + "get_posts/?post_status=publish&post_type[]=info_block&post_type[]=fiveleft_project&post_type[]=fiveleft_client&post_type[]=fiveleft_agency&count=200&include=id,slug,title,content,custom_fields,type,categories,attachments,menu_order",
      json : true
    };

    if( useCache ) {
      req.apicacheGroup = "content";
    }

    request( params, function( err, response, body ){
      if( err ) return;
      var json = cleanJSON( body.posts );

      // If we are in local Dev and we are not using cache, write a JSON file to reduce CMS server requests.
      if( app.get('env') === 'development' && !useCache ) {
        var fn = path.join(__dirname, '../sitecontent.json');
        var jst = JSON.stringify( json );
        console.log('  - writing file: ', fn );
        fs.writeFile( fn, jst, function(err){
          if( err ) throw err;
          console.log( "  - write file " + fn + " complete!" );
        });
      }

      res.send( json );
    });
  }
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