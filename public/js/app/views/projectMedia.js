// app/views/projectMedia.js 
define(
  ['jquery','underscore','backbone','events','tweenlite'],
  function( $, _, Backbone, Events, TweenLite ){

    var galleryDuration = 3000;

    var ProjectMediaView = Backbone.View.extend({

      initialize : function() {
        this.playing = false;
      },

      
      render : function() {
        this.$mediaContainer = $(".media-container", this.$el);
        this.$timeMarker = $(".marker", this.$mediaContainer);
        this.isGallery = this.$mediaContainer.hasClass('gallery');
        this.isVideo = this.$mediaContainer.hasClass('video');
        if( this.isGallery ) this._renderGallery();
        if( this.isVideo ) this._renderVideo();
      },

      
      _renderGallery : function() {
        this.$galleryItems = $(".gallery-item", this.$mediaContainer);
        this.galleryItemCount = this.$galleryItems.length;
        this.hasGallery = this.galleryItemCount > 1;
        this.galleryIndex = 0;
        this.$galleryItems.first().addClass("active");
      },

      
      _renderVideo : function() {
        var self = this;
        this.video = $("video", this.$mediaContainer)[0];
        this.video.addEventListener( "timeupdate", _.throttle(function(){self._updateVideo();}, 500) );
      },

      
      events : {
        "click a.media-control" : "_togglePlay"
      },

      
      start : function() {
        this.playing = true;
        this.$el.addClass( "playing" );
        if( this.isGallery ) this._startGallery();
        if( this.isVideo ) this.video.play();
      },

      
      stop : function() {
        this.$el.removeClass( "playing" );
        if( this.isGallery ) this._stopGallery();
        if( this.isVideo ) this.video.pause();
        this.playing = false;
      },

      
      _updateVideo : function() {
        if( !_.isNumber(this.video.duration) ) {
          return;
        }
        if( this.video.currentTime < 1 ) {
          this.$timeMarker.css("width", (p*100)+"%");
          return;
        }
        var p = this.video.currentTime / this.video.duration;
        TweenLite.to( this.$timeMarker, 0.5, {width:(p*100)+"%", ease:Linear.easeNone});
      },

      
      _startGallery : function() {
        var self = this;
        var p = (this.galleryIndex+1) / this.galleryItemCount;
        this.timer = window.setTimeout( function(){self._updateGallery();}, galleryDuration );

        if( this.galleryIndex===0 ) {
          TweenLite.set( this.$timeMarker, {width:0} );
        }
        TweenLite.to( this.$timeMarker, (galleryDuration/1000), {width:(p*100)+"%", ease:Linear.easeNone});
      },

      
      _stopGallery : function() {
        window.clearTimeout( this.timer );
        TweenLite.killTweensOf( this.$timeMarker );
      },

      
      _updateGallery : function() {
        if( !this.playing ) return;

        this.galleryIndex = (this.galleryIndex == this.galleryItemCount-1) ? 0 : this.galleryIndex+1;
        var old = this.$galleryItems.filter(".active");
        var next = $(this.$galleryItems[this.galleryIndex]);
        // 
        old.addClass("fade").siblings().removeClass("fade");
        next.addClass("active").siblings().removeClass("active");
        this._startGallery();
      },

      
      _togglePlay : function( e ) {
        e.preventDefault();
        this[ (this.playing ? "stop" : "start") ]();
        Events.trigger( "project:playMedia" );
      }

    });

    return ProjectMediaView;
  });