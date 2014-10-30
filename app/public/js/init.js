$(function() {
  var projects = new ProjectCollection(),
      clients = new ClientCollection(),
      agencies = new AgencyCollection();



  projects.fetch({
    success: function( data ) {
      var view = new ProjectCollectionView({ collection:data });
      $(".project-list").append( view.render().el );
    }
  });

  clients.fetch({
    success: function( data ) {
      var view = new ClientCollectionView({ collection:data });
      $(".client-list").append( view.render().el );
    }
  });

  agencies.fetch({
    success: function( data ) {
      var view = new ClientCollectionView({ collection:data });
      $(".agency-list").append( view.render().el );
    }
  });

})