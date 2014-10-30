// Filename: collections/partnerCollection.js
define(
  ['underscore','backbone','app/models/partners'], 
  function(_, Backbone, PartnerModel) {
    var PartnerCollection = Backbone.Collection.extend({
      model: PartnerModel,
      url: "/api/partners"
    });
    // Return the model for the module
    return PartnerCollection;
  });