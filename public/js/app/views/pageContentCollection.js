define(
  ['jquery', 'backbone', 'app/views/pageContent'],
  function( $, Backbone, PageContentView ){

    var pcView;

    var PageContentCollectionView = Backbone.View.extend({
      render: function() {
        this.collection.each( function( data ){
          pcView = new PageContentView({ model:data });
          pcView.render();
          // this.$el.append( pcView.render().el );
          // console.log( data.attributes.slug );
          // $("[data-content='" + data.attributes.slug + "']").replace( this.el );
        }, this);
        return this;
      }
    });

    return PageContentCollectionView;
  });