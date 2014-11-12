// Filename: models/partners.js
define(
  ['underscore','backbone','app/models/pagecontent'], 
  function(_, Backbone, PageContentModel) {
    var _instance;
    var PageContentCollection = Backbone.Collection.extend({
      model: PageContentModel,
      url: "/api/pagecontent"
    });
    if( !_instance ) _instance = new PageContentCollection();
    return _instance;
  });