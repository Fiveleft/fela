// app/appRouter.js
define( 
  ['backbone','events','siteindex' ],
  function( Backbone, Events, SiteIndex ) {

    var siteindex;

    var Router = Backbone.Router.extend({

      initialize: function() {
        // console.log( "AppRouter.initialize()" );
        var self = this;
        Events.on("router:navigate", function(url){
          self.navigate( url, {trigger:true} );
        })
      },

      routes: {
        "" : "index",
        "work" : "index",
        "info" : "index",
        "connect" : "index",
        "project/:slug" : "project"
      },

      _buildIndex : function() {
        if( !siteindex ) {
          siteindex = new SiteIndex();
        }
      },

      index : function() {
        this._buildIndex();
        console.log( " route:index" );
      },

      project : function( slug ) {
        this._buildIndex();
        console.log( " route:project, slug: " + slug );
        // site.index.workView
        // var projectData = siteindex.projectsCollection.findWhere({"slug" : slug});
        // var projectView = new ProjectView({ collection:siteindex.projectsCollection });
        // projectView.render();
      },

    });
    return Router;
  });