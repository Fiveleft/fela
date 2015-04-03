// Filename: models/partners.js
define(
  ['underscore','backbone','app/models/projects'], 
  function(_, Backbone, ProjectModel) {
    var _instance;
    var ProjectCollection = Backbone.Collection.extend({
      model: ProjectModel,
      url: "/api/projects",
      comparator: function( p1, p2 ) {
        var a1 = p1.attributes,
          a2 = p2.attributes;

        // sort order (higher priority), then by (recently launched)
        return (a1.priority > a2.priority) ? 1 :
          (a1.priority < a2.priority) ? -1 :
          (a1.sinceLaunch > a2.sinceLaunch) ? 1 :
          (a1.sinceLaunch < a2.sinceLaunch) ? -1 :
          0;     
      }
    });
    if( !_instance ) _instance = new ProjectCollection();
    return _instance;
  });