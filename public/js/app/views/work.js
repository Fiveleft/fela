// partner.js
define(
  ['jquery', 'backbone', 'app/views/projectGridItem', 'app/views/project'],
  function( $, Backbone, ProjectGridItemView, ProjectView ){

    var self;

    var WorkView = Backbone.View.extend({

      initialize : function() {
        self = this;
        this.setElement( $("#work-section")[0] );
        this.projectList = $("#work-section .project-list");

        if( !this.collection.length ) {
          this.listenToOnce( this.collection, "sync", this.render );
        }else{
          this.render();
        }
      },

      render: function() {
        var projectGridView;

        this.collection.each( function( projectItem ){
          projectGridView = new ProjectGridItemView({ model:projectItem });
          self.projectList.append( projectGridView.render().el );
        }, this);
        return this;
      }
    });

    return WorkView;
  });