// Filename: collections/mediaCollection.js
define(
  ['backbone','app/models/mediaAsset'], 
  function(Backbone, MediaAsset) {
    var MediaCollection = Backbone.Collection.extend({
      model: MediaAsset
    });
    // Return the model for the module
    return MediaCollection;
  });