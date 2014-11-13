// Filename: collections/partnerCollection.js
define(
  ['underscore','backbone','app/models/partners'], 
  function(_, Backbone, PartnerModel) {
    var _instance;
    var PartnerCollection = Backbone.Collection.extend({
      model: PartnerModel,
      url: "/api/partners",
      comparator: "priority"
    });
    // Return the model for the module
    if( !_instance ) _instance = new PartnerCollection();
    return _instance;
  });