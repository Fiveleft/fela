// Filename: models/projects.js
define([
    'underscore',
    'backbone',
    'app/collections/mediaCollection',
    'app/collections/categoryCollection',
    'app/collections/partnerCollection'
  ], 
  function(
    _, 
    Backbone, 
    MediaCollection, 
    CategoryCollection,
    PartnerCollection
  ){

    var videoDefaults = {
      video_file : false,
      video_formats : [],
      video_poster : false
    };

    var ProjectModel = Backbone.Model.extend({


      initialize: function() {

        var a = this.attributes,
          agency,
          client,
          thumbnail;

        // Set up collections
        this.media = new MediaCollection( a.attachments );
        this.categories = new CategoryCollection( a.categories );

        a.disciplines = this.categories.getDisiciplines();
        a.technologies = this.categories.getTechnologies();
        a.tools = this.categories.getTools();

        if( a.gallery ) {
          a.gallery = this.media.createGallery( a.gallery );
        }
        thumbnail = this.media.getThumbnail();
        a.gridImage = (thumbnail) ? thumbnail.getImage().url : null;

        if( !thumbnail ) {
          console.log( a.slug, " no thumbnail: ", this.media );
        }


console.log( a.slug, a );

        // If no info set on Project Data, skip
        if( !a.info ) {
          return this;
        }

        // Get Agency
        if( a.info.agency !== "null" && a.info.hasOwnProperty("agency") ) {
          agency = PartnerCollection.findWhere({ id : parseInt(a.info.agency,10) });
          if( agency ) a.info.agency = agency.attributes;
        }else{
          delete a.info.agency;
        }
        // Get Client
        if( a.info.client !== "null" && a.info.hasOwnProperty("client") ) {
          client = PartnerCollection.findWhere({ id : parseInt(a.info.client,10) });
          if( client ) a.info.client = client.attributes;
        }else{
          delete a.info.client;
        }
        // Set Content
        if( a.info.description ) {
          a.content_orig = a.content;
          a.content = a.info.description;
        }
        // Set Priority
        if( a.info.priority ) {
          a.priority = parseInt(a.info.priority,10);
        }
        // Set Launch Date
        if( a.info.date_launched ) {
          a.launchDate = new Date( a.info.date_launched.replace( /(\d{4})(\d{2})(\d{2})/, "$2/$3/$1") );
        }
        // Set Video
        if( a.info.video === "1" ) {
          a.video = {
            source : {}
          };
          if( a.info.video_poster ){
            var posterID = parseInt( a.info.video_poster, 10 ),
              media = this.media.get( posterID );
            
            a.video.poster = this.media.get( parseInt(a.info.video_poster,10) ).attributes;
          }
          _.each( a.info.video_formats, function( f ) {
            a.video.source[f] = __cdn + a.info.video_file + "." + f;
          });
        }

        // Sorting weight uses priority, then most recent time
        a.sinceLaunch = Date.now() - a.launchDate.getTime();
      },
      

      getView : function() {
        return this.get("view");
      },
      

      setView : function( html ) {
        this.set("view", html);
      }


    });
    // Return the model for the module
    return ProjectModel;
  });