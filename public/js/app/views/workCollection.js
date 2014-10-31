// partner.js
define(
  ['backbone', 'app/views/projectGridItem'],
  function( Backbone, ProjectGridItemView ){

    var projectGridView;

    var WorkCollectionView = Backbone.View.extend({
      render: function() {
        this.collection.each( function( projectItem ){
          projectGridView = new ProjectGridItemView({ model:projectItem });
          this.$el.append( projectGridView.render().el );
        }, this);
        return this;
      }
    });

    return WorkCollectionView;
  });