// Filename: collections/mediaCollection.js
define(
  ['backbone','app/models/mediaAsset'], 
  function(Backbone, MediaAsset) {
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
    });
    // Return the model for the module
    return MediaCollection;
  });