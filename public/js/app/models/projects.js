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

        var a = this.attributes;

        // Set up collections
        this.media = new MediaCollection( a.attachments );
        this.categories = new CategoryCollection( a.categories );

        a.disciplines = this.categories.getDisiciplines();
        a.technologies = this.categories.getTechnologies();
        a.tools = this.categories.getTools();

        if( a.gallery ) {
          a.gallery = this.media.createGallery( a.gallery );
        }
        a.gridImage = this.media.getThumbnail().getImage().url;

        // If no info set on Project Data, skip
        if( !a.info ) {
          return this;
        }
        // Get Agency
        if( a.info.agency !== "null" ) {
          a.info.agency = PartnerCollection.findWhere({ id : parseInt(a.info.agency,10) }).attributes;
        }
        // Get Client
        if( a.info.client !== "null" ) {
          a.info.client = PartnerCollection.findWhere({ id : parseInt(a.info.client,10) }).attributes;
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
            poster : this.media.get( parseInt(a.info.video_poster,10) ).attributes,
            source : {}
          };
          _.each( a.info.video_formats, function( f ) {
            a.video.source[f] = __cdn + a.info.video_file + "." + f;
          });
        }
      },
      getView : function() {
        return this.get("view");
      },
      setView : function( html ) {
        this.set("view", html);
      },
    });
    // Return the model for the module
    return ProjectModel;
  });