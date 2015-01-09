({
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
  },
  baseUrl: "public/js",
  name: "init",
  out: "app/dist/js/main.js",
  removeCombined: true
})