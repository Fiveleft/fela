// Filename siteindex.js
define([
    'jquery',
    'backbone',
    'events',
    'tweenmax',
    'app/collections/pageContentCollection',
    'app/collections/partnerCollection',
    'app/collections/projectCollection',
    "app/views/nav",
    'app/views/pageContentCollection',
    'app/views/partnerCollection',
    'app/views/work'
  ], 
  function(
    $,
    Backbone,
    Events,
    TweenMax,
    PageContentCollection, 
    PartnerCollection, 
    ProjectCollection,
    NavView,
    PageContentCollectionView,
    PartnerCollectionView,
    WorkView
  ){
    
    var SiteIndexView = Backbone.View.extend({

      $el : $("body"),
      
      initialize : function() {
        // console.log( "SiteIndex.initialize" );
        this.$main = $("main");
        this.$siteContent = $("#site-content");
        
        var projectsData = JSON.parse($("#data-api-projects").attr("data-json")); 
        var partnersData = JSON.parse($("#data-api-partners").attr("data-json")); 
        var contentData = JSON.parse($("#data-api-content").attr("data-json")); 
        $("#data-api-projects").remove();
        $("#data-api-partners").remove();
        $("#data-api-content").remove();
        
        PartnerCollection.reset( partnersData );
        ProjectCollection.reset( projectsData );
        PageContentCollection.reset( contentData ); 

        new NavView({el:$('#header')});
        new PartnerCollectionView({ el:$(".agency-list")[0], type:"fiveleft_agency", collection:PartnerCollection });
        new PartnerCollectionView({ el:$(".client-list")[0], type:"fiveleft_client", collection:PartnerCollection });
        new WorkView({ collection:ProjectCollection });
        new PageContentCollectionView({ collection:PageContentCollection });


        this.listenTo( Events, "mobilenav:open", this._mobileNavOpen );
        this.listenTo( Events, "mobilenav:close", this._mobileNavClose );
        this.listenTo( Events, "mobilenav:closed", this._mobileNavClosed );
      },

      resize : function( e ) {
        console.log( "SiteIndex.resize()", e );
      },

      scroll : function( e ) {
        console.log( "SiteIndex.scroll()", e );
      },

      _mobileNavOpen : function() {
        // console.log( "SiteIndex._mobileNavOpen" );
        var windowTop = window.scrollY;
        this.$siteContent.css({"margin-top" : -windowTop });
      },

      _mobileNavClose : function() {
        // console.log( "SiteIndex._mobileNavClose" );
      },
      
      _mobileNavClosed : function() {
        // console.log( "SiteIndex._mobileNavClosed" );
        var windowTop = -parseInt(this.$siteContent.css("margin-top"),10);
        this.$siteContent.css({"margin-top" : ""});
        window.scrollTo( 0, windowTop );
      },

    });

    return SiteIndexView;
  });