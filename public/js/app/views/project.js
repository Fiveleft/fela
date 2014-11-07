// project.js
define(
  ['jquery','underscore','backbone','events','templates','tweenlite','app/views/projectMedia'],
  function( $, _, Backbone, Events, templates, TweenLite, ProjectMediaView ){

    var ProjectView = Backbone.View.extend({

      initialize : function() {
        this.mediaView = new ProjectMediaView({ model:this.model });

        // Events
        this.listenTo( Events, Events.scrollToEnd, this._scrollToEnd );
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

      _openComplete : function() {

      },

      close : function() {
        console.log("ProjectView[" + this.model.attributes.slug + "].close()" );
        this.mediaView.stop();
      },

      _closeComplete : function() {

      },

      clickClose : function( e ) {
        e.preventDefault();
        this.close();
        Events.trigger( "router:navigate", "/work" );
      },

      _scrollToEnd : function() {
        // console.log( "ProjectView._scrollToEnd", this );
      }

    });

    return ProjectView;
  });