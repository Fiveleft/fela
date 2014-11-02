// Filename: models/projects.js
define(
  ['underscore','backbone'], 
  function(_, Backbone) {
    var ProjectModel = Backbone.Model.extend({
      initialize: function() {
        this.attributes.gridImage = __cdn + this.attributes.thumbnail.substring(this.attributes.thumbnail.lastIndexOf("/") + 1);
        // console.log( this.attributes );
        // this.attributes.info = this.get("post_meta").info;
        // this.attributes.subtitle = this.attributes.info.subtitle || false;
        // this.attributes.gridImage = this.get("featured_image").attachment_meta.file || false;
      }
    });
    // Return the model for the module
    return ProjectModel;
  });