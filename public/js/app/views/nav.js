// nav.js
define(
  ['jquery','events','backbone'],
  function( $, Events, Backbone ){

    var transitionEndEvents = "webkitTransitionEnd MozTransitionEnd oTransitionEnd transitionend";

    var NavView = Backbone.View.extend({

      initialize : function() {

        this.$main = $("main");
        this.mobileNavOpen = false;
        this.onMobileNavClosed = false;
      },

      events : {
        'click #mobile-nav .menu-trigger' : 'toggleMobileNav',
        'click #mobile-nav .logo' : 'indexState',
        'click #top-nav .nav-link[href^="/"]' : 'indexState'
      },

      indexState : function( e ) {
        e.preventDefault();

        var url = $(e.currentTarget).attr("href");

        // mobleNavOpen, close first
        if( this.mobileNavOpen ) {
          this._closeMobileNav();
          this.onMobileNavClosed = function(){ Events.trigger( "router:navigate", url); };
        }else{
          Events.trigger( "router:navigate", url);
        }
      },

      toggleMobileNav : function( e ) {
        e.preventDefault();
        if( this.$main.hasClass("snap-nav") ){
          this._closeMobileNav();
        }else{
          this._openMobileNav();
        }
      },

      _openMobileNav : function() {
        // console.log( "Nav._openMobileNav" );
        Events.trigger( "mobilenav:open" );
        this.$main.addClass("snap-nav open");
        this.mobileNavOpen = true;
      },

      _closeMobileNav : function() {
        // console.log( "Nav._closeMobileNav" );
        Events.trigger( "mobilenav:close" );
        var self = this;
        this.$main.on( Events.transitionEnd, function(){self._clearMobileNav();} );
        this.$main.removeClass("open");
      },

      _clearMobileNav : function() {
        // console.log( "Nav._clearMobileNav" );
        this.mobileNavOpen = false;
        
        this.$main.off( Events.transitionEnd, self._clearMobileNav );
        this.$main.removeClass("snap-nav");
        Events.trigger( "mobilenav:closed" );
        
        if( this.onMobileNavClosed ) {
          this.onMobileNavClosed.call();
          this.onMobileNavClosed = false;
        }
      }

    });


    return NavView;
  });