// Filename: models/mediaAsset.js
define(
  ['underscore','backbone'], 
  function(_, Backbone) {


    function getFilePath( str ) {
      return str.substring( str.lastIndexOf("/") + 1 );
    }

    var MediaAsset = Backbone.Model.extend({
      initialize: function() {
        this.attributes._url = this.attributes.url;
        this.attributes.file = getFilePath( this.attributes._url );
        this.attributes.url = __cdn + this.attributes.file;
        _.each( this.attributes.images, function(item){
          item._url = item.url;
          item.file = getFilePath( item.url );
          item.url = __cdn + item.file;
        });
      },
      getImage: function( type ) {
        var imgObj = (this.attributes.images.hasOwnProperty(type)) ? this.attributes.images[type] : this.attributes.images.full;
        return imgObj;
      }
    });
    // Return the model for the module
    return MediaAsset;
  });    
