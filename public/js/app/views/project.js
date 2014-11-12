// project.js
define(
  ['jquery','underscore','backbone','events','templates','tweenlite','app/views/projectMedia'],
  function( $, _, Backbone, Events, templates, TweenLite, ProjectMediaView ){

    var ProjectView = Backbone.View.extend({

      initialize : function() {
        this.mediaView = new ProjectMediaView({ model:this.model });
      },

      render : function() {
        var html = templates["project"](this.model.attributes);
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
        // console.log("ProjectView[" + this.model.attributes.slug + "].open()" );
        this.$el.addClass("active");

        TweenLite.to( this.$el, 0.5, {
          // delay: 0.2,
          height: window.innerHeight,
          ease: Expo.easeInOut,
          onComplete: this._openComplete,
          onCompleteScope: this
        });
      },

      _openComplete : function() {
        this.$el
          .addClass("open")
          .css({"height" : ""});

        // console.log("ProjectView[" + this.model.attributes.slug + "].openComplete()" );
        this.mediaView.start();
      },

      close : function() {
        // console.log("ProjectView[" + this.model.attributes.slug + "].close()" );
        this.mediaView.stop();

        this.$el.removeClass("open");

        TweenLite.to( this.$el, 0.5, {
          // delay: 0.2,
          height: 0,
          ease: Expo.easeInOut,
          clearProps: "all",
          onComplete: this._closeComplete,
          onCompleteScope: this
        });
      },

      _closeComplete : function() {
        this.$el
          .removeClass("active")
          .remove();
        // console.log("ProjectView[" + this.model.attributes.slug + "].closeComplete()" );
      },

      clickClose : function( e ) {
        e.preventDefault();
        // this.close();
        Events.trigger( "router:navigate", "/work" );
      },

    });

    return ProjectView;
  });