  // api.js
var app = require('../app'),
    express = require('express'),
    request = require('request'),
    path = require('path'),
    fs = require('fs'),
    apicache = require('apicache'),
    phpUnserialize = require('php-unserialize'),
    siteContent = require('../sitecontent.json'),
    urlBase = "http://cms.fiveleft.com/wordpress/api/";

var router  = express.Router(),
    cachetime = 1000*60*60*24*10,
    cacheDebug = true,
    useCachedJSON = true,
    cache = apicache.options({debug:cacheDebug, defaultDuration:(cachetime)}).middleware;



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


function cleanJSON( json ){

  var galleryPattern = /\?attachment_id=(\d+)/gi;

  for( var i=json.length-1; i!==-1; i-- ) {

    // Project JSON Object
    var pObj = json[i];
    var cf = pObj.custom_fields;
    // Convert custom_fields to "info" property;
    // if( pObj.type.match( /_client|_agency/ ) ) {
    //   console.log( pObj.type, pObj.slug );
    // }
    if( cf.description ) {
      pObj.info = {};
      for( var p in cf ) {
        pObj.info[p] = cf[p][0];
        if( p == "video_formats" && cf[p][0].length ) {
          pObj.info[p] = phpUnserialize.unserialize( cf[p][0] );
        }
      }
    }
    if( cf._meta ) {
      pObj.meta = phpUnserialize.unserialize( cf._meta );
      delete cf._meta;
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





/* GET partners */
router.get('/sitecontent/:uncache?', cache(), function(req, res){

  console.log( "ROUTE: SiteContent uncache = ", req.query.uncache );  

  if (app.get('env') === 'development' && req.query.uncache!=="1" ) {
    console.log( "Environment: " + app.get('env') + " | loading site content data from JSON file" );
    res.send( siteContent );
  } else {
    console.log(" loading site content data from CMS " );
    var params = {
      url : urlBase + "get_posts/?post_status=publish&post_type[]=info_block&post_type[]=fiveleft_project&post_type[]=fiveleft_client&post_type[]=fiveleft_agency&count=200&include=id,slug,title,content,custom_fields,type,categories,attachments",
      json : true
    };
    req.apicacheGroup = "content";
    request( params, function( err, response, body ){
      if( err ) return;
      var json = cleanJSON( body.posts );

      if( app.get('env') === 'development' && req.query.uncache==="1" ) {
        var fn = path.join(__dirname, '../sitecontent.json');
        var jst = JSON.stringify( json );
        console.log(' writing file: ', fn );
        fs.writeFile( fn, jst, function(err){
          if( err ) throw err;
          console.log( " WRITE FILE COMPLETE" );
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