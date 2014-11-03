// Filename: models/partners.js
define(
  ['underscore','backbone'], 
  function(_, Backbone) {
    var PartnerModel = Backbone.Model.extend({
      initialize: function() {
        this.attributes.priority = parseInt(this.attributes.info.priority,10);
        // console.log( this.attributes.info );
      }
    });
    // Return the model for the module
    return PartnerModel;
  });