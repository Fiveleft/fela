// Filename: models/projects.js
define(
  ['underscore','backbone','app/collections/mediaCollection'], 
  function(_, Backbone, MediaCollection) {

    function getThumbnail( obj ) {
      var tObj = obj.attributes.thumbnail_images,
        tPath = tObj.full.url,
        tFile = tPath.substring( tPath.lastIndexOf("/") + 1 );
      return tFile;
    }

    var ProjectModel = Backbone.Model.extend({
      initialize: function() {
        this.media = new MediaCollection( this.attributes.attachments );
        this.attributes.launchDate = new Date( this.attributes.info.launchdate.replace( /(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1") );
        this.attributes.priority = parseInt(this.attributes.info.priority,10);
        this.attributes.gridImage = __cdn + getThumbnail(this);
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