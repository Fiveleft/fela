// Filename: models/mediaAsset.js
define(
  ['underscore','backbone'], 
  function(_, Backbone) {
    var MediaAsset = Backbone.Model.extend({
      initialize: function() {

      },
      getImage: function( type ) {
        var imgObj = (this.attributes.images.hasOwnProperty(type)) ? this.attributes.images[type] : this.attributes.images.full;
        return imgObj;
      }
    });
    // Return the model for the module
    return MediaAsset;
  });