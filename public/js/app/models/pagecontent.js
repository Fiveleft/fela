// Filename: models/pagecontent.js
define(
  ['underscore','backbone'], 
  function(_, Backbone) {
    var PageContent = Backbone.Model.extend({
      initialize: function() {
        // console.log( this.attributes );
        // this.attributes.info = this.get("post_meta").info;
        // this.attributes.subtitle = this.attributes.info.subtitle || false;
        // this.attributes.gridImage = this.get("featured_image").attachment_meta.file || false;
      }
    });
    // Return the model for the module
    return PageContent;
  });