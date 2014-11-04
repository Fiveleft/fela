// nav.js
define(
  ['events','backbone'],
  function( Events, Backbone ){

    var NavView = Backbone.View.extend({

      initialize : function() {
        // console.log( this );
      },

      events : {
        'click #mobile-nav .menu-trigger' : 'toggleMobileNav',
        'click #mobile-nav .logo' : 'indexState',
        'click #top-nav .nav-link[href^="/"]' : 'indexState'
      },

      indexState : function( e ) {
        e.preventDefault();
        var url = $(e.currentTarget).attr("href");
        Events.trigger( "router:navigate", url);
      },

      toggleMobileNav : function( e ) {
        e.preventDefault();
        Events.trigger( "mobilenav:toggle" );
      }

    });


    return NavView;
  });