// partner.js
define(
  ['jquery', 'backbone', 'events', 'app/views/projectGridItem', 'app/views/project' ],
  function( $, Backbone, Events, ProjectGridItemView, ProjectView ){

    var self,
      $projectContainer,
      $activeContainer,
      $inactiveContainer,
      $projectList,
      $gridItems,
      activeSlug,
      activeView = null,
      lastView = null,
      containerIndex = 1;


    function toggleActiveContainer() {

      // Inactive Container is now current container
      $inactiveContainer = $($projectContainer[containerIndex]);
      $inactiveContainer.removeClass("active");

      // Update Container index
      containerIndex = (containerIndex+1) % 2;

      // Active container is the toggled 
      $activeContainer = $($projectContainer[containerIndex]);
      $activeContainer.addClass("active");
    }


    var WorkView = Backbone.View.extend({

      initialize : function() {
        self = this;
        this.setElement( $("#work-section")[0] );
        $projectList = $(".project-list", this.$el );
        $projectContainer = $(".project-view", $projectList);
        $scrollTarget = $(".scroll-target", $projectList);
        toggleActiveContainer();

        // Add EventListeners
        this.listenTo( Events, "project:set", this.setProject );
        this.listenTo( Events, "project:open", this.openProject );
        this.listenTo( Events, "project:close", this.closeProject );
        this.listenTo( Events, Events.breakpoint, this._breakpointChange );
        this.listenTo( Events, Events.scrollTo, this._scrollTo );

        this.render();
      },

      
      render: function() {
        var projectGridView;

        this.collection.each( function( projectItem ){
          projectGridView = new ProjectGridItemView({ model:projectItem });
          $projectList.append( projectGridView.render().el );
        }, this);

        $gridItems = $(".project-item", this.$projectList );

        // Open project if activeSlug is set
        if( activeSlug ) this.openProject( activeSlug );

        return this;
      },

      
      setProject : function ( slug ) {

        var projectData = this.collection.findWhere({"slug":slug}),
          projectView = projectData.getView();

        // Define the activeSlug first.
        activeSlug = slug;

        // Activate the correct project grid item
        $gridItems.each(function(i,el){
          $(el).toggleClass( "active", $(el).attr("data-slug")===slug );
        });

        // Position the new Active Container
        toggleActiveContainer();
        this._positionActiveContainer();

        // If ProjectView is not set
        if( !projectView ) {
          projectView = new ProjectView({model:projectData});
          projectData.setView( projectView );
        }
        // Swap Active Views
        if( activeView ) lastView = activeView;
        activeView = projectView;
        activeView.render();
      },

      
      openProject : function () {
        // console.log( "Work.openProject() lastView:", lastView, " activeView:", activeView.model.get("slug") );
        if( lastView ) lastView.close();
        lastView = null;

        // Clear and update the activeContainer
        $activeContainer.empty().append( activeView.el );
        activeView.open();
      },

      
      closeProject : function () {
        if( activeView === null ) {
          return; 
        }
        $gridItems.filter( "[data-slug='" + activeView.model.get("slug") + "']" ).removeClass("active");

        console.log( "Work.closeProject()", activeView.model.get("slug") );
        activeView.close();
        activeView = null;
        $scrollTarget.removeClass("offset");
      },

      
      _scrollTo : function () {
        var path = window.location.pathname.split("/");
        var target = path[1];
        var slug = path[2];
        switch( target ) {
        case "work" : 
          this.closeProject();
          break;
        case "project" : 
          if( activeSlug === slug ) this.openProject();
          break;
        }
      },

      
      _positionActiveContainer : function() {

        // Get Data and View
        var gridItem = $gridItems.filter(".active");

        if( gridItem.length === 0 ) {
          //console.log( "no active container or grid item" );
          return;
        }

        var gridIndex = parseInt(gridItem.attr("data-index"), 10),
          gridCols = Math.round( $projectList[0].clientWidth / $gridItems[0].clientWidth ),
          itemRow = Math.floor( gridIndex / gridCols ),
          itemIndex = gridCols * itemRow,
          prevView = [],
          $addBeforeItem = $("[data-index='" + itemIndex + "']", $projectList ).parent();

        $activeContainer.insertBefore( $addBeforeItem ); 
        $scrollTarget.insertBefore( $activeContainer );

        prevView = $scrollTarget.prevAll(".project-view");

        if( prevView.children().length > 0 ) {
          $scrollTarget.addClass("offset").children().css("top", -prevView.height());
        }else{
          $scrollTarget.removeClass("offset");
        }
      },

      
      _breakpointChange : function() {
        this._positionActiveContainer();
        $inactiveContainer.insertBefore( $activeContainer );
      }


    });
    return WorkView;
  });