// Filename: models/mediaAsset.js
define(
  ['underscore','backbone'], 
  function(_, Backbone) {
    var MediaAsset = Backbone.Model.extend({
      initialize: function() {
        _.each( this.attributes.images, function(item){
          item.file = item.url.substring( item.url.lastIndexOf("/") + 1 );
        })
      },
      getImage: function( type ) {
        var imgObj = (this.attributes.images.hasOwnProperty(type)) ? this.attributes.images[type] : this.attributes.images.full;
        return imgObj;
      },
      getFilePath: function( str ) {
        str.substring( str.lastIndexOf("/") + 1 )
      }
    });
    // Return the model for the module
    return MediaAsset;
  });    
