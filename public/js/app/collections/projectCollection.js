// Filename: models/partners.js
define(
  ['underscore','backbone','app/models/projects'], 
  function(_, Backbone, ProjectModel) {
    var _instance;
    var ProjectCollection = Backbone.Collection.extend({
      model: ProjectModel,
      url: "/api/projects"
    });
    if( !_instance ) _instance = new ProjectCollection();
    return _instance;
  });