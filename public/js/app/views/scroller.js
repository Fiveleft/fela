define(
  ['jquery','underscore','backbone','events','tweenlite','fiveleft/core/Utils'],
  function( $, _, Backbone, Events, TweenLite, Utils ){
    
    var _instance = false,
      minTime = 0.25,
      maxTime = 0.75,
      activeOffset = window.innerHeight / 2,
      activeSection = -1,
      topAffixed = true,
      scrollClasses = [
        "below-view",
        "top-inside-view",
        "inside-view",
        "bot-inside-view",
        "above-view",
        "unknown-view"
      ];


    var ScrollerView = Backbone.View.extend({

      $el : $("body"),

      initialize : function() {
        var self = this;
        // console.log( "ScrollerView.initialize()" );

        // Set Event Listeners
        this.windowEvents = {
          "resize" : _.throttle(function(){self.resize();}, 100), 
          "scroll" : _.throttle(function(){self.scroll();}, 200)
        };

        // Set elements
        this.$nav = $("#top-nav");
        this.$navLinks = $("[data-id]", this.$nav);
        this.$footer = $("#footer");
        this.$sections = $("article > section.container");
        this.$sectionInners = $(".section-inner", this.$sections);

        // Set Measurements
        this.totalHeight = this.$footer.offset().top + this.$footer.height();
        this.scrollArea = Math.max( this.totalHeight - window.innerHeight, 0 );
      },

      start : function() {
        $(window).on( this.windowEvents );
        this.resize();
        this.listenTo( Events, Events.scrollTo, this._pageScrollTo );
        this.listenTo( Events, Events.changeHeight, this._measure );
      },

      stop : function() {
        $(window).off( this.windowEvents );
        this.stopListening( Events, Events.scrollTo, this._pageScrollTo );
      },

      resize : function() {
        this.$sectionInners.css( "min-height", window.innerHeight );
        this._measure();
      },

      scroll : function() {
        this._measureScroll();
      },

      _measure : function() {
        console.log( "ScrollerView._measure()");
        this.totalHeight = this.$footer.offset().top + this.$footer.height();
        this.scrollArea = Math.max( this.totalHeight - window.innerHeight, 0 );
        activeOffset = Math.round( window.innerHeight * 0.333);
        this._measureScroll();
      },


      _measureScroll : function() {
        var self = this,
          wT = window.scrollY,
          wH = window.innerHeight,
          wB = wT + wH,
          s = 0,
          top, 
          bot;

        // Check Top affixed
        if( topAffixed !== (wT < activeOffset) ) {
          topAffixed = (wT < activeOffset);
          this.$nav.toggleClass( "affixed", topAffixed );
        }

        this.$sections.each( function(i, el) {
          top = Math.round( $(el).offset().top - activeOffset );
          bot = top + Math.round( $(el).height() ) + (2*activeOffset);
          s = 5;
          switch( true ) {
            case top > wB :
              s = 0; // top is BELOW viewport
              break;
            case bot < wT :
              s = 4; // bottom is ABOVE viewoprt
              break;
            case top <= wT && bot >= wB :
            case top >= wT && bot <= wB :
              s = 2; // section FILLS or is INSIDE viewport
              break;
            case top-wH <= wB && top > wT :
              s = 1; // top is INSIDE viewport
              break;
            case top < wT && bot > wT :
              s = 3; // bottom is INSIDE viewport
              break;
          }

          if( activeSection !== $(el).attr("data-id") && s === 2 ) {
            activeSection = $(el).attr("data-id");
            self._navActiveUpdate();
          }

          // if( i === 0 ) console.log( top, "["+wT+"]", bot, s, scrollClasses[s] );
          $(el)
            .attr("data-scroll", scrollClasses[s])
            .toggleClass( "active", s===2 );
        });

      },

      _navActiveUpdate : function() {
        console.log( "_navActiveUpdate ", activeSection );
        this.$navLinks.each( function(i,el) {
          var active = $(el).attr( "data-id" ) === activeSection;
          $(el).toggleClass("active", active);
        });
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
          scrollTo:{y:targetY, autoKill:false}, 
          ease:Expo.easeInOut, 
          onComplete:self._pageScrollToComplete, 
          onCompleteScope:self 
        });
      },

      _pageScrollToComplete : function() {
        // console.log( "ScrollerView._pageScrollToComplete() ", this );
        this._measureScroll();
        $(window).on( this.windowEvents );
        Events.trigger( Events.scrollToEnd );
      }

    });
    
    if( !_instance ) _instance = new ScrollerView();
    return _instance;
  });