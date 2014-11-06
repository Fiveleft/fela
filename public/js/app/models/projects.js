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

    var ProjectModel = Backbone.Model.extend({
      initialize: function() {

        var a = this.attributes,
          cm = a.custom_fields,
          agencyID,
          clientID;

        this.media = new MediaCollection( a.attachments );
        this.categories = new CategoryCollection( a.categories );
        this.thumbnail = this.media.getThumbnail().getImage();

        if( cm.hasOwnProperty('description') ) {         
          agencyID = parseInt(cm.agency[0],10);
          clientID = parseInt(cm.client[0],10);

          a.content_orig = a.content;
          a.content = cm.description.length ? cm.description[0] : a.content;
          a.subtitle = cm.subtitle[0];
          a.priority = parseInt(cm.priority[0],10);
          a.agency = PartnerCollection.findWhere({ id : agencyID }).attributes;
          a.client = PartnerCollection.findWhere({ id : clientID }).attributes;

          //

          if( cm.video.length ) {
            a.video = cm.video[0];
          }
          if( a.gallery ) {

          }
        }
        // a.launchDate = new Date( cm.date_launched[0].replace( /(\d{4})(\d{2})(\d{2})/, "$2/$3/$1") );
        // a.launchDate = new Date( a.info.launchdate.replace( /(\d{4})(\d{2})(\d{2})/, "$2/$3/$1") );

        a.gridImage = __cdn + this.thumbnail.file;
        a.disciplines = this.categories.getDisiciplines();
        a.technologies = this.categories.getTechnologies();
        a.tools = this.categories.getTools();

        //console.log( a );
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