// Filename siteindex.js
define([
    'jquery',
    'backbone',
    'events',
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
        // var self = this;
        
        var projectsData = JSON.parse($("#data-api-projects").attr("data-json")); 
        var partnersData = JSON.parse($("#data-api-partners").attr("data-json")); 
        var contentData = JSON.parse($("#data-api-content").attr("data-json")); 
        
        PartnerCollection.reset( partnersData );
        ProjectCollection.reset( projectsData );
        PageContentCollection.reset( contentData ); 

        new NavView({el:$('#header')});
        new PartnerCollectionView({ el:$(".agency-list")[0], type:"fiveleft_agency", collection:PartnerCollection });
        new PartnerCollectionView({ el:$(".client-list")[0], type:"fiveleft_client", collection:PartnerCollection });
        new WorkView({ collection:ProjectCollection });
        new PageContentCollectionView({ collection:PageContentCollection });

        $("#data-api-projects").remove();
        $("#data-api-partners").remove();
        $("#data-api-content").remove();

        this.listenTo( Events, "mobilenav:toggle", this.toggleMobileNav );
      },

      resize : function( e ) {
        console.log( "SiteIndex.resize()", e );
      },

      scroll : function( e ) {
        console.log( "SiteIndex.scroll()", e );
      },

      toggleMobileNav : function() {
        console.log( "SiteIndex:toggleMobileNav");
      }

    });

    return SiteIndexView;
  });