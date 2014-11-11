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
        console.log( "ProjectMediaView.render()", this.el );
        
        this.$mediaContainer = $(".media-container", this.$el);
        this.isGallery = this.$mediaContainer.hasClass('gallery');
        this.isVideo = this.$mediaContainer.hasClass('video');

        if( this.isGallery ) {
          this._renderGallery();
        }else{
          this._renderVideo();
        }
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
        this.$videoMarker = $(".marker", this.$mediaContainer);
        this.video.addEventListener( "timeupdate", _.throttle(function(){self._updateVideo();}, 500) );
      },

      events : {
        "click a.media-controls" : "_togglePlay"
      },

      start : function() {
        this.playing = true;
        if( this.isGallery ) this._startGallery();
        if( this.isVideo ) this.video.play();
      },

      stop : function() {
        if( this.isGallery ) this._stopGallery();
        if( this.isVideo ) this.video.pause();
        this.playing = false;
      },

      _updateVideo : function() {
        if( !_.isNumber(this.video.duration) ) return;
        var p = this.video.currentTime / this.video.duration;
        TweenLite.to( this.$videoMarker, 0.5, {left:(p*100)+"%", ease:Linear.easeNone});
      },

      _startGallery : function() {
        var self = this;
        this.timer = window.setTimeout( function(){self._updateGallery();}, galleryDuration );
      },

      _stopGallery : function() {
        window.clearTimeout( this.timer );
      },

      _updateGallery : function() {
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
        console.log("ProjectMediaView.togglePlay()" );
        Events.trigger( "project:playMedia" );
      }

    });

    return ProjectMediaView;
  });