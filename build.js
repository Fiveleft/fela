({
    baseUrl: "public/js",
    paths: {
      jquery: 'vendor/jquery/dist/jquery',
      underscore: 'vendor/underscore/underscore',
      backbone: 'vendor/backbone/backbone',
      handlebars: 'vendor/handlebars/handlebars',
      tweenmax: 'vendor/gsap/TweenMax'
    },
    shim: {
      templates: 'app/views/templates'
    },
    name: "main",
    out: "public/js/main-built.js"
})