// Filename: models/partners.js
define(
  ['underscore','backbone'], 
  function(_, Backbone) {
    var PartnerModel = Backbone.Model.extend({
      initialize: function() {
        // console.log( this.attributes.title, this.attributes.info );
        // this.attributes.priority = parseInt(this.attributes.info.priority,10);
      }
    });
    // Return the model for the module
    return PartnerModel;
  });