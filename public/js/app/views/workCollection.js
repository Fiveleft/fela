// partner.js
define(
  ['jquery', 'backbone', 'app/views/projectGridItem'],
  function( $, Backbone, ProjectGridItemView ){

    var projectGridView,
      $projectList = $("#work-section .project-list");

    var WorkCollectionView = Backbone.View.extend({
      render: function() {
        this.collection.each( function( projectItem ){
          projectGridView = new ProjectGridItemView({ model:projectItem });
          $projectList.append( projectGridView.render().el );

          // this.$el.append( projectGridView.render().el );
        }, this);
        return this;
      }
    });

    return WorkCollectionView;
  });