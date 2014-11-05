// project.js
define(
  ['jquery','underscore','backbone','events','templates','tweenmax'],
  function( $, _, Backbone, Events, templates, TweenMax ){


    var $mediaControls,
      $mediaList,
      window;



    var ProjectView = Backbone.View.extend({

      initialize : function() {
        // console.log("ProjctView.initialize()", this.model.attributes.content );
      },

      render : function() {
        var html = templates["project-item"](this.model.attributes);
        this.setElement( html );
        return this;
      },

      events : {
        "click a.close" : "close"
      },

      open : function() {
        console.log("ProjectView[" + this.model.attributes.slug + "].open()" );
      },

      close : function( e ) {
        e.preventDefault();
        console.log("ProjectView[" + this.model.attributes.slug + "].close()" );
        Events.trigger( "router:navigate", "/work" );
      }

    });

    return ProjectView;
  });