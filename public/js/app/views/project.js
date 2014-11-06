// project.js
define(
  ['jquery','underscore','backbone','events','templates','tweenmax'],
  function( $, _, Backbone, Events, templates, TweenMax ){


    // var $mediaControls;
    // var $mediaList;
    // var window;
    TweenMax;
    // console.log( window );


    var ProjectView = Backbone.View.extend({

      initialize : function() {
        // console.log("ProjctView.initialize()", this.model.attributes.content );
      },

      render : function() {
        var html = templates["project-item"](this.model.attributes);
        this.setElement( html );
        console.log( this );
        this.$el.css({"min-height" : window.innerHeight});
        return this;
      },

      events : {
        "click a.close" : "close",
        "click a.media-controls" : "togglePlay"
      },

      open : function() {
        console.log("ProjectView[" + this.model.attributes.slug + "].open()" );
      },

      close : function( e ) {
        e.preventDefault();
        console.log("ProjectView[" + this.model.attributes.slug + "].close()" );
        Events.trigger( "router:navigate", "/work" );
      },

      togglePlay : function( e ) {
        e.preventDefault();
        console.log("ProjectView[" + this.model.attributes.slug + "].togglePlay()" );
        Events.trigger( "project:playMedia" );
      }

    });

    return ProjectView;
  });