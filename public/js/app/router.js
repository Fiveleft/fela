// app/appRouter.js
define( 
  [ 'jquery','underscore','backbone','events','siteindex' ],
  function( $, _, Backbone, Events, SiteIndex ) {

    var siteindex;

    var Router = Backbone.Router.extend({

      initialize: function() {
        // console.log( "AppRouter.initialize()" );
        var self = this;
        Events.on("router:navigate", function(url, options){
          var opt = _.extend( {trigger:true}, options );
          self.navigate( url, opt );
        });
      },

      routes: {
        "" : "index",
        "work" : "index",
        "info" : "index",
        "connect" : "index",
        "project/:slug" : "project"
      },

      _scrollTo : function( element ) {
        if( !element ) {
          var target = window.location.pathname.split("/")[1];
          element = $("[data-scrollto='" + target + "']");
        }
        Events.trigger( Events.scrollTo, element );
      },

      _buildIndex : function() {
        if( !siteindex ) {
          siteindex = new SiteIndex();
        }
      },

      index : function() {
        this._buildIndex();
        this._scrollTo();
      },

      project : function( slug ) {
        this._buildIndex();
        Events.trigger( "project:open", slug );
        this._scrollTo();
      },

    });
    return Router;
  });