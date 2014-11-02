// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/projects/list',
  'views/users/list'
], function($, _, Backbone, ProjectListView, UserListView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '/projects': 'showProjects',
      '/users': 'showUsers',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){
    var appRouter = new AppRouter;
    appRouter.on('showProjects', function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      var projectListView = new ProjectListView();
      projectListView.render();
    });
      // As above, call render on our loaded module
      // 'views/users/list'
    appRouter.on('showUsers', function(){
      // var userListView = new UserListView();
      // userListView.render();
      console.log("Users Route");
    });
    appRouter.on('defaultAction', function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('No route:', actions);
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});