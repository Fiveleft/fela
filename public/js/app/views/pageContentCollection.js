define(
  ['backbone', 'app/views/pageContent'],
  function( Backbone, PageContentView ){

    var pcView;

    var PageContentCollectionView = Backbone.View.extend({
      render: function() {
        this.collection.each( function( data ){
          pcView = new PageContentView({ model:data });
          this.$el.append( pcView.render().el );
        }, this);
        return this;
      }
    });

    return PageContentCollectionView;
  });