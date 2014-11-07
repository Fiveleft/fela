// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: 'vendor/jquery/dist/jquery',
    underscore: 'vendor/underscore/underscore',
    backbone: 'vendor/backbone/backbone',
    handlebars: 'vendor/handlebars/handlebars',
    tweenlite: 'vendor/gsap/src/uncompressed/TweenLite',
    tweenmax: 'vendor/gsap/src/uncompressed/TweenMax',
    scrollPlugin: 'vendor/gsap/src/uncompressed/plugins/ScrollToPlugin',
    templates: 'app/views/templates',
    events: 'app/events',
    router: 'app/router',
    siteindex : 'app/views/siteindex'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'backbone'
    },
    'tweenlite': {
      deps: ['scrollPlugin'],
      exports: 'TweenLite'
    }
  }
});

// Load our app module and pass it to our definition function
require(['app'], function(App) {
  $(function(){
    App.start();
  });
});