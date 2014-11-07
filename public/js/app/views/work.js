// partner.js
define(
  ['jquery', 'backbone', 'events', 'app/views/projectGridItem', 'app/views/project' ],
  function( $, Backbone, Events, ProjectGridItemView, ProjectView ){

    var self,
      projectContainer,
      activeContainer,
      activeSlug,
      containerIndex = 1,
      projectList;


    function toggleActiveContainer() {
      $(projectContainer[containerIndex]).removeClass("active");
      containerIndex = (containerIndex+1) % 2;
      $(projectContainer[containerIndex]).addClass("active");
      return $(projectContainer[containerIndex]);
    }


    var WorkView = Backbone.View.extend({

      initialize : function() {
        self = this;
        this.setElement( $("#work-section")[0] );
        projectList = $(".project-list", this.$el );
        projectContainer = $(".project-view", projectList);
        activeContainer = toggleActiveContainer();

        // Add EventListeners
        this.listenTo( Events, "project:open", this.openProject );
        this.listenTo( Events, "project:close", this.closeProject );

        this.render();
      },

      render: function() {
        var projectGridView;
        this.collection.each( function( projectItem ){
          projectGridView = new ProjectGridItemView({ model:projectItem });
          projectList.append( projectGridView.render().el );
        }, this);

        //console.log( "workView.render()" );

        if( activeSlug ) {
          this.openProject( activeSlug );
        }

        return this;
      },

      openProject : function ( slug ) {

        // Define the activeSlug first.
        activeSlug = slug;

        // Check to see if collection is loaded. If not loaded, listen to load event and re-call method.
        if( !this.collection.length ) return;

        // Get Data and View
        var projectData = this.collection.findWhere({"slug":slug});
        var projectView = projectData.getView();

        // If ProjectView is not set
        if( !projectView ) {
          projectView = new ProjectView({model:projectData});
          projectData.setView( projectView );
        }

        // Clear and update the activeContainer
        activeContainer = toggleActiveContainer();
        activeContainer.empty().append( projectView.render().el );

      },

      closeProject : function () {

      }
    });

    return WorkView;
  });