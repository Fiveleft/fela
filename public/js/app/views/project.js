// project.js
define(
  ['jquery','underscore','backbone','events','templates','tweenlite','app/views/projectMedia','fiveleft/core/Utils'],
  function( $, _, Backbone, Events, templates, TweenLite, ProjectMediaView, Utils ){

    var ProjectView = Backbone.View.extend({

      initialize : function() {
        var self = this;

        this.mediaView = new ProjectMediaView({ model:this.model });

        this.measurements = {
          top: 0,
          bottom: 0
        };
        
        // Set Event Listeners
        this.windowEvents = {
          "scroll" : _.throttle(function(){self._scroll();}, 500)
        };
      },

      
      render : function() {
        var html = templates["project"](this.model.attributes);
        this.setElement( html );
        
        // Set Views and Elements
        this.mediaView.setElement( $(".media", this.$el) );
        this.mediaView.render();
        
        this.$inner = $( ".project-inner", this.$el );
        this.$inner.css({"min-height" : window.innerHeight});
        this.$mediaInner = $( ".media-inner", this.$el );
        this.$el.css({ "height" : 0 });

        return this;
      },

      
      events : {
        "click a.close" : "clickClose"
      },

      
      open : function() {
        // console.log("ProjectView[" + this.model.attributes.slug + "].open()" );
        this.$el.addClass("active");

        TweenLite.to( this.$el, 0.75, {
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

        this.measurements.top = this.$mediaInner.offset().top;
        this.measurements.bottom = this.measurements.top + this.$mediaInner.outerHeight();

        $(window)
          .off( this.windowEvents ) // clear these out just in case
          .on( this.windowEvents );

        // console.log("ProjectView[" + this.model.attributes.slug + "].openComplete()" );
        Events.trigger( Events.changeHeight );
        this.mediaView.start();
      },

      
      close : function() {
        // console.log("ProjectView[" + this.model.attributes.slug + "].close()" );
        this.mediaView.stop();

        $(window).off( this.windowEvents );

        this.$el.removeClass("open");

        TweenLite.to( this.$el, 0.75, {
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
        Events.trigger( Events.changeHeight );
      },

      
      clickClose : function( e ) {
        e.preventDefault();
        // this.close();
        Events.trigger( "router:navigate", "/work" );
      },


      _scroll : function() {
        var scrollY = (window.scrollY || window.pageYOffset || document.documentElement.scrollTop),
          offsetTop = this.measurements.top - window.innerHeight,
          offsetBottom = this.measurements.bottom,
          stayActive = Utils.inRange( scrollY, offsetTop, offsetBottom );

        switch( true ) {
        case stayActive && !this.mediaView.playing :
          this.mediaView.start();
          break;
        case !stayActive && this.mediaView.playing :
          this.mediaView.stop();
          break;
        }
      }

    });

    return ProjectView;
  });