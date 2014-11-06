define(
  ['jquery', 'backbone', 'app/views/pageContent'],
  function( $, Backbone, PageContentView ){

    var pcView;
    var PageContentCollectionView = Backbone.View.extend({

      initialize : function() {
        // if( !this.collection.length ) {
        //   this.listenToOnce( this.collection, "sync", this.render );
        // }else{
        // }
        this.render();
      },
      render: function() {
        //console.log( this.collection );
        this.collection.each( function( data ){
          pcView = new PageContentView({ model:data });
          pcView.render();
        }, this);
        return this;
      }
    });

    return PageContentCollectionView;
  });