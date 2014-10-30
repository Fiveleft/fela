// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/pageContentCollection',
    'app/collections/partnerCollection',
    'app/collections/projectCollection'
  ], 
  function(
    $, 
    _, 
    Backbone, 
    PageContentCollection, 
    PartnerCollection, 
    ProjectCollection
  ){

    var projects = new ProjectCollection(), 
      partners = new PartnerCollection(), 
      pageContent = new PageContentCollection();

    function buildProjects() {
      // console.log( "App.buildProjects");
    }
    function buildPartners() {
      // console.log( " - agencies  - ", partners.where({ type : "fiveleft_agency" }) );
      // console.log( " - clients - ", partners.where({ type : "fiveleft_client" }) );
    }
    function buildPageContent() {
      // console.log( "App.buildPageContent");
    }

    var initialize = function(){
      projects.fetch({ success:buildProjects });
      partners.fetch({ success:buildPartners });
      pageContent.fetch({ success:buildPageContent });
      console.log( "App.initialize" );
    };

    return {
      initialize: initialize
    };
  });