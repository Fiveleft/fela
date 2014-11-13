// app/models/breakpoints.js
define(
  ['backbone','events'],
  function( Backbone, Events ){

    var _instance,
      xsMax = 767,
      smMax = 1024,
      mdMax = 1280,
      xsQuery = 'screen and (max-width:' + xsMax + 'px)',
      smQuery = 'screen and (min-width:' + (xsMax+1) + 'px) and (max-width: ' + smMax + 'px)',
      mdQuery = 'screen and (min-width:' + (smMax+1) + 'px) and (max-width:' + mdMax + 'px)',
      lgQuery = 'screen and (min-width:' + (mdMax+1) + 'px)';

    var Breakpoints = Backbone.Model.extend({

      breakpoint : "xs",

      initialize : function() {

        var self = this;

        this.xs = window.matchMedia( xsQuery );
        this.sm = window.matchMedia( smQuery );
        this.md = window.matchMedia( mdQuery );
        this.lg = window.matchMedia( lgQuery );

        this.xs.name = "xs";
        this.sm.name = "sm";
        this.md.name = "md";
        this.lg.name = "lg";

        this.xs.addListener( function( mql ){self._mqListener(mql);} );
        this.sm.addListener( function( mql ){self._mqListener(mql);} );
        this.md.addListener( function( mql ){self._mqListener(mql);} );
        this.lg.addListener( function( mql ){self._mqListener(mql);} );

      },

      _mqListener : function( mql ) {
        if( mql.matches ) {
          this.set( "breakpoint", mql.name );
          Events.trigger( Events.breakpoint, this );
        }
      },




    });

    if( !_instance ) _instance = new Breakpoints();
    return _instance;
  });