define(
  ['jquery','underscore','backbone','events','tweenlite','vendor/fiveleft/core/utils'],
  function( $, _, Backbone, Events, TweenLite, Utils ){
    
    var _instance = false,
        minTime = 0.25,
        maxTime = 0.75;

    var ScrollerView = Backbone.View.extend({

      $el : $("body"),

      initialize : function() {
        var self = this;
        console.log( "ScrollerView.initialize()" );

        // Set Event Listeners
        this.windowEvents = {
          resize : _.throttle(this.resize, 200), 
          scroll : _.throttle(this.scroll, 200)
        };

        // Set elements
        this.$footer = $("#footer");

        // Set Measurements
        this.totalHeight = this.$footer.offset().top + this.$footer.height();
        this.scrollArea = Math.max( this.totalHeight - window.innerHeight, 0 );
      },

      start : function() {
        $(window).on( this.windowEvents );
        this.listenTo( Events, Events.scrollTo, this._pageScrollTo );
      },

      stop : function() {
        $(window).off( this.windowEvents );
        this.stopListening( Events, Events.scrollTo, this._pageScrollTo );
      },

      resize : function() {
        // console.log( "ScrollerView.resize()");
      },

      scroll : function() {
        // console.log( "ScrollerView.scroll()");
      },

      _pageScrollTo : function( element ) {
        if( !$(element).length ) {
          // console.log( "ScrollerView._pageScrollTo() could not find target element : ", element );
          return;
        }

        var self = this,
          targetY = $(element).offset().top,
          distance = Math.abs( targetY - window.scrollY ),
          dRatio = Utils.ratioBetween( distance, 0, this.scrollArea ),
          duration = Utils.ratioOf( dRatio, minTime, maxTime );

        // Kill Window Event listeners
        $(window).off( this.windowEvents );

        // Animate to target position
        TweenLite.to( window, duration, {
          scrollTo:{y:targetY}, 
          ease:Expo.easeInOut, 
          onComplete:self._pageScrollToComplete, 
          onCompleteScope:self 
        });
      },

      _pageScrollToComplete : function() {
        // console.log( "ScrollerView._pageScrollToComplete() ", this );
        $(window).on( this.windowEvents );
        Events.trigger( Events.scrollToEnd );
      }

    });
    
    if( !_instance ) _instance = new ScrollerView();
    return _instance;
  });