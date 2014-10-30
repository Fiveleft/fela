// Filename: models/partners.js
define(
  ['underscore','backbone','app/models/projects'], 
  function(_, Backbone, ProjectModel) {
    var ProjectCollection = Backbone.Collection.extend({
      model: ProjectModel,
      url: "/api/projects"
    });
    // Return the model for the module
    return ProjectCollection;
  });