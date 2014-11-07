// project.js
define(
  ['jquery','underscore','backbone','events','templates','app/views/projectMedia'],
  function( $, _, Backbone, Events, templates, ProjectMediaView ){

    var ProjectView = Backbone.View.extend({

      initialize : function() {
        this.mediaView = new ProjectMediaView({ model:this.model });
      },

      render : function() {
        var html = templates["project-item"](this.model.attributes);
        this.setElement( html );

        this.$el.css({"min-height" : window.innerHeight});
        this.mediaView.setElement( $(".media", this.$el) );
        this.mediaView.render();

        console.log( this.model.attributes );

        return this;
      },

      events : {
        "click a.close" : "clickClose"
      },

      open : function() {
        console.log("ProjectView[" + this.model.attributes.slug + "].open()" );
        this.mediaView.start();
      },

      close : function() {
        console.log("ProjectView[" + this.model.attributes.slug + "].close()" );
        this.mediaView.stop();
      },

      clickClose : function( e ) {
        e.preventDefault();
        this.close();
        Events.trigger( "router:navigate", "/work" );
      }

    });

    return ProjectView;
  });