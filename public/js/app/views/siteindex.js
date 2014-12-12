// Filename siteindex.js
define([
    'jquery',
    'underscore',
    'backbone',
    'events',
    'tweenmax',
    'app/collections/partnerCollection',
    'app/collections/projectCollection',
    "app/views/nav",
    'app/views/work',
    'app/views/scroller',
    'app/models/breakpoints'
  ], 
  function(
    $,
    _,
    Backbone,
    Events,
    TweenMax,
    PartnerCollection, 
    ProjectCollection,
    NavView,
    WorkView,
    ScrollerView,
    Breakpoints
  ){
    
    var SiteIndexView = Backbone.View.extend({

      $el : $("body"),
      
      initialize : function() {
        // console.log( "SiteIndex.initialize" );
        this.$main = $("main");
        this.$siteContent = $("#site-content");
        
        var siteData = JSON.parse($("#data-api-data").attr("data-json")); 
        $("#data-api-data").remove();
        
        var projectsData = _.where( siteData, {type:"fiveleft_project"});//JSON.parse($("#data-api-projects").attr("data-json")); 
        var partnersData = _.filter( siteData, function(p){ 
            if( /_agency|_client/g.test( p.type ) ) return p;
        });
       
        PartnerCollection.reset( partnersData );
        ProjectCollection.reset( projectsData );

        console.log(PartnerCollection);

        new NavView({el:$('#header')});
        new WorkView({ collection:ProjectCollection });

        // Start the ScrollerView
        ScrollerView.start();
        Breakpoints;

        this.listenTo( Events, "mobilenav:open", this._mobileNavOpen );
        this.listenTo( Events, "mobilenav:close", this._mobileNavClose );
        this.listenTo( Events, "mobilenav:closed", this._mobileNavClosed );
      },

      _mobileNavOpen : function() {
        // console.log( "SiteIndex._mobileNavOpen" );
        var windowTop = window.scrollY;
        this.$siteContent.css({"margin-top" : -windowTop });
        // window.scrollTo( 0, 0 );
      },

      _mobileNavClose : function() {
        // console.log( "SiteIndex._mobileNavClose" );
      },
      
      _mobileNavClosed : function() {
        // console.log( "SiteIndex._mobileNavClosed" );
        var windowTop = -parseInt(this.$siteContent.css("margin-top"),10);
        this.$siteContent.css({"margin-top" : ""});
        window.scrollTo( 0, windowTop );
      }

    });

    return SiteIndexView;
  });