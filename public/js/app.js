// app.js
define(
  ['jquery', 'backbone', 'router'],
  function( $, Backbone, Router ) {

    var App = {
      start : function() {
        new Router();
        Backbone.history.start({pushState: true});
      }
    };
    return App;
  });