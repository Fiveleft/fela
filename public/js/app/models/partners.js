// Filename: models/partners.js
define(
  ['underscore','backbone'], 
  function(_, Backbone) {
    var PartnerModel = Backbone.Model.extend({
      initialize: function() {
        this.attributes.priority = 100;
        if( this.attributes.info ) {
          this.attributes.priority = parseInt(this.attributes.info.priority,10) || 100;
        }
        // console.log( this.attributes.slug, this.attributes.priority );
      }
    });
    // Return the model for the module
    return PartnerModel;
  });