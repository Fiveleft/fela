// Filename: collections/mediaCollection.js
define(
  ['underscore','backbone','app/models/mediaAsset'], 
  function(_, Backbone, MediaAsset) {
   
    var MediaCollection = Backbone.Collection.extend({
      
      model: MediaAsset,
      
      getThumbnail: function() {
        var t = _.find( this.models, function( item ) { 
          if( item.attributes.slug.match( /thumb/i ) ) {
            return item;
          }
        });
        return t;
      },

      createGallery: function( idList ) {
        var m, 
            self=this, 
            g = [];
        _.each( idList.split(","), function( id ) {
          m = self.get( id ); 
          g.push( m.attributes );
        });
        return g;
      }

    });
    // Return the model for the module
    return MediaCollection;
  });