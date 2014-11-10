// partner.js
define(
  ['jquery', 'backbone', 'events', 'app/views/projectGridItem', 'app/views/project' ],
  function( $, Backbone, Events, ProjectGridItemView, ProjectView ){

    var self,
      $projectContainer,
      $activeContainer,
      $projectList,
      activeSlug,
      activeView,
      lastView,
      containerIndex = 1;


    function toggleActiveContainer() {
      var oldC, newC;

      oldC = $($projectContainer[containerIndex]);
      containerIndex = (containerIndex+1) % 2;
      newC = $($projectContainer[containerIndex]);
      oldC
        .removeClass("active")
        .attr("data-scrollto", "");
      newC
        .addClass("active")
        .attr("data-scrollto", "project");
      return newC;
    }


    var WorkView = Backbone.View.extend({

      initialize : function() {
        self = this;
        this.setElement( $("#work-section")[0] );
        $projectList = $(".project-list", this.$el );
        $projectContainer = $(".project-view", $projectList);
        $activeContainer = toggleActiveContainer();

        // Add EventListeners
        this.listenTo( Events, "project:set", this.setProject );
        this.listenTo( Events, "project:open", this.openProject );
        this.listenTo( Events, "project:close", this.closeProject );
        this.listenTo( Events, Events.scrollTo, this._scrollTo );

        this.render();
      },

      render: function() {
        var projectGridView;
        this.collection.each( function( projectItem ){
          projectGridView = new ProjectGridItemView({ model:projectItem });
          $projectList.append( projectGridView.render().el );
        }, this);

        //console.log( "workView.render()" );

        if( activeSlug ) {
          this.openProject( activeSlug );
        }

        return this;
      },

      setProject : function ( slug ) {

        // Define the activeSlug first.
        activeSlug = slug;

        // Get Data and View
        var projectData = this.collection.findWhere({"slug":slug});
        var projectView = projectData.getView();
        var gridItem = $("[data-slug='" + slug + "']", $projectList );
        var gridIndex = parseInt(gridItem.attr("data-index"), 10);
        var gridCols = Math.round( $projectList[0].clientWidth / gridItem[0].clientWidth );
        var itemRow = Math.floor( gridIndex / gridCols );
        var rowCol1 = gridCols * itemRow;
        var $firstItemInRow = $("[data-index='" + rowCol1 + "']", $projectList ).parent();

        // If ProjectView is not set
        if( !projectView ) {
          projectView = new ProjectView({model:projectData});
          projectData.setView( projectView );
        }

        // Swap Active Views
        if( activeView ) {
          lastView = activeView;
          lastView.deactivate();
        }
        activeView = projectView;
        projectView.activate();

        // Clear and update the activeContainer
        $activeContainer = toggleActiveContainer();
        $activeContainer.empty().append( projectView.render().el );

        // Prepend Active Container before the first gridItem in the targeted row
        if( $firstItemInRow.prev().hasClass("project-view") ) {
          $activeContainer.insertBefore( $firstItemInRow.prev() );
        }else{
          $activeContainer.insertBefore( $firstItemInRow );
        }
      },

      openProject : function () {
        if( lastView ) lastView.close();
        lastView = null;
        activeView.open();
      },

      closeProject : function () {
        if( activeView ) activeView.close();
        activeView = null;
      },

      _scrollTo : function () {
        var path = window.location.pathname.split("/");
        var target = path[1];
        var slug = path[2];
        switch( target ) {
        case "work" : 
          console.log( " show work view " );
          this.closeProject();
          break;
        case "project" : 
          console.log( " show project view " );
          if( activeSlug === slug ) {
            this.openProject();
          }
          break;
        }
      }

    });
    return WorkView;
  });