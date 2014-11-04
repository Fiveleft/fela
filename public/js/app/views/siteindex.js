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

    var projects = new ProjectCollection(), 
      partners = new PartnerCollection(), 
      pageContent = new PageContentCollection();


    var SiteIndexView = Backbone.View.extend({

      $el : $("body"),
      
      initialize : function() {
        // console.log( "SiteIndex.initialize" );
        // var self = this;
        new NavView({el:$('#header')});
        new PartnerCollectionView({ el:$(".agency-list")[0], type:"fiveleft_agency", collection:partners });
        new PartnerCollectionView({ el:$(".client-list")[0], type:"fiveleft_client", collection:partners });
        new WorkView({ collection:projects });
        new PageContentCollectionView({ collection:pageContent });

        projects.fetch();
        partners.fetch();
        pageContent.fetch();

        // Make Projects Collection available
        // this.projectsCollection = projects;

        // Hook Events
        // $(window)
        //   .on("resize", self.resize )
        //   .on("scroll", self.scroll );
           
        // this.listenTo( projects, "sync", function( e ){ console.log("projects.sync", e ); });
        // this.listenTo( partners, "sync", function( e ){ console.log("partners.sync", e ); });
        // this.listenTo( pageContent, "sync", function( e ){ console.log("pageContent.sync", e ); });
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