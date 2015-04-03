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
    'app/views/connectForm',
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
    ConnectForm,
    Breakpoints
  ){
    
    var SiteIndexView = Backbone.View.extend({

      $el : $("body"),
      
      initialize : function() {
        
        var siteData = JSON.parse($("#data-api-data").attr("data-json")),
            projectsData = _.where( siteData, {type:"fiveleft_project"}),
            partnersData = _.filter( siteData, function(p){ 
                if( /_agency|_client/g.test( p.type ) ) return p;
            });

        // Remove data holder
        $("#data-api-data").remove();

        this.$main = $("main");
        this.$siteContent = $("#site-content");
        this.$stateJump = $("#footer a.logo, a.scroll-instructions")
        
       
        PartnerCollection.reset( partnersData );
        ProjectCollection.reset( projectsData );

        new NavView({el:$('#header')});
        new WorkView({ collection:ProjectCollection });

        // Start the ScrollerView
        ScrollerView.start();
        Breakpoints;
        ConnectForm;

        // Events
        this.$stateJump.on( "click", this.indexState );
        this.listenTo( Events, "mobilenav:open", this._mobileNavOpen );
        this.listenTo( Events, "mobilenav:close", this._mobileNavClose );
        this.listenTo( Events, "mobilenav:closed", this._mobileNavClosed );
      },


      indexState : function( e ) {
        console.log( e );
        e.preventDefault();
        e.stopPropagation();
        var url = $(e.currentTarget).attr("href");
        Events.trigger( "router:navigate", url);
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