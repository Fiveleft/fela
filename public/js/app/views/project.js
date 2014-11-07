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

        // Set Views and Elements
        this.mediaView.setElement( $(".media", this.$el) );
        this.mediaView.render();
        
        this.$inner = $( ".project-inner", this.$el );
        this.$inner.css({"min-height" : window.innerHeight});

        this.$el.css({ "height" : 0 });
        
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