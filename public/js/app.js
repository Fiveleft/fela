// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/pageContentCollection',
    'app/collections/partnerCollection',
    'app/collections/projectCollection',
    'app/views/pageContentCollection',
    'app/views/partnerCollection',
    'app/views/workCollection'
  ], 
  function(
    $, 
    _, 
    Backbone, 
    PageContentCollection, 
    PartnerCollection, 
    ProjectCollection,
    PageContentCollectionView,
    PartnerCollectionView,
    WorkCollectionView
  ){

    var projects = new ProjectCollection(), 
      partners = new PartnerCollection(), 
      pageContent = new PageContentCollection();

    // Build Projects Grid View
    function buildProjects() {

      var wcView = new WorkCollectionView({ collection:projects });
      wcView.render();
      // $(".project-list").append( wcView.render().el );
    }

    function buildPartners() {

      var agencyData = partners.where({ type: "fiveleft_agency" }),
        clientData = partners.where({ type: "fiveleft_client" }),
        agencyView = new PartnerCollectionView({ collection:agencyData }),
        clientView = new PartnerCollectionView({ collection:clientData });

      $(".agency-list").append( agencyView.render().el );
      $(".client-list").append( clientView.render().el );
    }


    function buildPageContent() {

      var pcView = new PageContentCollectionView({ collection:pageContent });
      pcView.render();
      // $(".section-container").append( pcView.render().el );
    }

    var initialize = function(){
      projects.fetch({ success:buildProjects });
      partners.fetch({ success:buildPartners });
      pageContent.fetch({ success:buildPageContent });
      // console.log( "App.initialize" );
    };

    return {
      initialize: initialize
    };
  });