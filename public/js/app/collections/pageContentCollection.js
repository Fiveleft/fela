// Filename: models/partners.js
define(
  ['underscore','backbone','app/models/pagecontent'], 
  function(_, Backbone, PageContentModel) {
    var PageContentCollection = Backbone.Collection.extend({
      model: PageContentModel,
      url: "/api/pagecontent"
    });
    // Return the model for the module
    return PageContentCollection;
  });