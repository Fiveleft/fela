// app/views/projectMedia.js 
define(
  ['jquery','backbone','events'],
  function( $, Backbone, Events ){

    var ProjectMediaView = Backbone.View.extend({

      initialize : function(){
        // this.
        // console.log( "ProjectMediaView.initialize()", this.el );
      },

      render : function() {
        // console.log( "ProjectMediaView.render()", this.el );
        
      },

      _renderGallery : function() {

      },

      events : {
        "click a.media-controls" : "_togglePlay"
      },

      start : function() {
        console.log("ProjectMediaView.start()" );
      },

      stop : function() {
        console.log("ProjectMediaView.stop()" );
      },

      _togglePlay : function( e ) {
        e.preventDefault();
        console.log("ProjectMediaView.togglePlay()" );
        Events.trigger( "project:playMedia" );
      }

    });

    return ProjectMediaView;
  });