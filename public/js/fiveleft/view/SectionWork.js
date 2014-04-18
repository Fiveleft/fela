
!function($){

	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;

	// Shortcuts
	var _cn = "SectionWork"
		,_ref, _cfg, _sel, _cls, _evt
		,_defaults = {
			classes : {
				projectSwap : "project-swap"
			}
			,selectors : {
				projectView : ".project-view"
				,projectContainer : ".project-container"
				,gridItem : ".project-grid-item"
			}
		};


	function SectionWork( element )
	{
		this._init( element, _defaults );
	}

	SectionWork.prototype = {

		constructor : SectionWork

		, init : function(){

			// Shortcuts
			_ref = this;
			_cfg = this.config;
			_sel = this.config.selectors;
			_cls = this.config.classes;
			_evt = fiveleft.Event;

			// Elements
			this.$workGrid = $( ".work-grid", this.element );
			this.$inactiveProjectContainer = $(".inactive-project-container", this.$workGrid );
			this.$projectList = $( ".project-list", this.$workGrid );
			this.$projectGridItems = $(_sel.gridItem, this.$projectList );
			this.$projectView = $( ".project-view", this.$projectList );

			// Templates
			this.gridItemTemplate = fiveleft.templates["project-grid-item"]; //Handlebars.compile( $( "#project-grid-item-template" ).html() );
			this.projectTemplate = fiveleft.templates["project-item"]; //Handlebars.compile( $( "#project-template" ).html() );

			// Properties
			this.projectDataList = null;
			this.projectCount = 0;
			this.prependIndex = -1;
			this.projectActive = false;
			this.onLoadProjectName = null;
			this.topOffset = 0;
			this.grid = {};

			
			// Listeners
			this.$projectList.on( "click", ".project .close", handleProjectClose );
		}

		, target : function( path )
		{
			log( _cn + "::target", path );
			switch( true ) 
			{
				case path[0] == "work" && path.length === 1  && _ref.activeProject == null :
					// log( " target work" );
					this.scrollToPosition( this.top );
					break;

				case path[0] == "work" && path.length === 1  && _ref.activeProject !== null :
					// log( " target work path from an active project " );
					deactivateProject( _ref.activeProject, true );
					break;

				case path[0] == "project" && typeof path[1] !== "undefined" :
					// log( " target project " );
					var projectTarget = this.appData.getProject( path[1] );
					activateProject( projectTarget.id )
					break;
			}
		}


		, activate : function()
		{
			this.active = true;
			this.element.addClass( _cls.active );
			this.navItem.addClass( _cls.active );
		}

		, deactivate : function()
		{
			this.active = false;
			this.element.removeClass( _cls.active );
			this.navItem.removeClass( _cls.active );
		}

		, resize : function()
		{
			this.inner.css({"min-height" : this.window.height() });
			this.topOffset = parseFloat( this.inner.css("padding-top") );
			if( this.$activeView && this.active ) {
				// _ref.$scroller.scrollTop( _ref.$activeView.offset().top );
			}
		}

		, onMediaQueryChange : function() 
		{
			updateLayout();
		}

		, onSiteDataLoaded : function() 
		{
			createInitView();
			if( this.onLoadProjectName !== null ) {
				var project = this.appData.getProject( this.onLoadProjectName );
				activateProject( project.id );
			}
		}	

	};




	// ------------------------------------------------------------------------------------------
	// View Creation
	// ------------------------------------------------------------------------------------------	



	function deactivateProject( project, close )
	{
		// log( _cn + "::deactivateProject", project );
		project.onDeactivated = function(){ deactivateProjectComplete( project, close ); };
		project.deactivate( close );

		// Remove the active state from the grid item
		_ref.$projectList.find( _sel.gridItem + "[data-id='" + project.data.id + "']" ).removeClass( _cls.active );
	}


	function deactivateProjectComplete( project, close ) 
	{
		// log( _cn + "::deactivateProjectComplete | close: " + close, project.data.name );

		//if the project is attached to an inactive container
		if( project.$view.hasClass( _cls.inactive )) {
			project.$view.removeClass( _cls.inactive );
		}

		// Remove the Project and add to inactive container
		project.$element.detach();
		_ref.$inactiveProjectContainer.append( project.$element );

		if( _ref.activeProject == project ) {
			_ref.$activeView.removeClass( _cls.active + " " + _cls.inactive );
			_ref.$activeView = false;
			_ref.activeProject = null;
		}
		if( close ) {

			_ref.$activeView = false;
			_ref.activeProject = null;
		}

		_ref.window.trigger( _evt.DOMChange );	
	}



	function activateProject( projectID, scrollTo ) 
	{
		// log( _cn + "::activateProject", projectID );
		if( _ref.activeProject && _ref.activeProject.data.id === projectID ) {
			log( " XXX killing activateProject: targetProjectID is already active" );
			return;
		}

		var targetGridItem = _ref.$projectList.find( _sel.gridItem + "[data-id='" + projectID + "']" )
			,nextProjectID = targetGridItem.next( _sel.gridItem ).attr("data-id")
			,targetGridIndex = parseFloat( targetGridItem.attr("data-index") )
			,prependIndex = getProjectPrependIndex( targetGridIndex )
			,targetProject = retrieveProject( projectID )
			,prependTarget
			,lastProject
			,targetView;


		// log( _cn + "::activateProject() next project: " + nextProjectID );


		switch( true ) 
		{	
			// no active view, choose first project view;
			case !_ref.$activeView || _ref.$activeView.length === 0 :
				// log( " - case 1 : active view does not exist" );
				lastView = null;
				targetView = $(_ref.$projectView[0]);
				break;

			// Swap Active View: projects have separate view containers
			case _ref.prependIndex !== prependIndex :
				// log( " - case 2 : active view changes" );
				lastProject = _ref.activeProject;
				lastView = _ref.$activeView;
				targetView = _ref.$activeView.siblings( _sel.projectView );
				targetView.addClass( _cls.projectSwap );
				break;

			// Swap Active Projects in same view
			// active view remains, projects share view container
			case _ref.prependIndex == prependIndex :
				// log( " - case 3 : active view remains, projects change" );
				lastProject = _ref.activeProject;
				lastView = null;
				targetView = _ref.$activeView;
				break;
		}

		// UPDATE PROPERTIES
		_ref.activeGridIndex = targetGridIndex;

		// Swap the active grid item
		targetGridItem.addClass( _cls.active )
			.siblings(_sel.gridItem).removeClass( _cls.active );
				
		// Add Target Project to container
		$( _sel.projectContainer, targetView ).append( targetProject.$element );

		if( _ref.prependIndex !== prependIndex ){
			// Prepend Target View to Prepend Grid Item
			prependTarget = _ref.$projectList.find("[data-index=" + prependIndex + "]");
			prependTarget.before( targetView );
			_ref.prependIndex = prependIndex;
		}

		// Swap active views
		_ref.$activeView = targetView;
		_ref.$activeView.addClass( _cls.active ).removeClass( _cls.inactive );

		// Deactivate the last view
		if( lastView ){
			lastView.removeClass( _cls.active ).addClass( _cls.inactive );
		}
		// Deactivate the last project
		if( lastProject ) {
			deactivateProject( lastProject );
		}

		// Set the new Active Project
		if( targetProject ) {
			_ref.activeProject = targetProject;
			targetProject.setNextProject( _ref.appData.getProject( nextProjectID ) );
			targetProject.onActivated = function(){activateProjectComplete( targetProject )};
			targetProject.activate();
		}

		// _ref.stopScrollSpy();
	}


	function activateProjectComplete( project )
	{
		// log( _cn + "::activateProjectComplete", project );
		// _ref.startScrollSpy();
		_ref.window.trigger( _evt.DOMChange );
	}




	// ------------------------------------------------------------------------------------------
	// View Creation
	// ------------------------------------------------------------------------------------------	


	/**
	 * Retrieve Project Instance by finding previously created element and its "project" data,
	 * 	 or creating a nwe Project Instance
	 * @param  {String} projectID - project.id
	 * @return {Project} Project.js Instance
	 */
	function retrieveProject( projectID )
	{
		var $pElem = _ref.$inactiveProjectContainer.find( "[data-id=\"" + projectID + "\"]" )
			,project = $pElem.data("project");

		if( $pElem.length === 0 ) {
			var data = _ref.appData.getProject( projectID );
			project = new fiveleft.Project( $(_ref.projectTemplate(data)), data );
		}
		return project;
	}


	/**
	 * Get the Project grid item's index for prepending the active project view
	 * @param  {int} projectIndex - index of targeted Project Item
	 * @return {int} grid item's index for prepending active view.
	 */
	function getProjectPrependIndex( projectIndex )
	{
		var targetRow = Math.floor( projectIndex / _ref.grid.cols );
		return (targetRow * _ref.grid.cols);
	}


	/**
	 * Create the initial project grid using project grid item template
	 * @return {[type]} [description]
	 */
	function createInitView()
	{
		var context, element;

		// These will be the items we ALWAYS have space for in the Grid.
		_ref.projectDataList = _ref.appData.getProjects();
		_ref.projectCount = _ref.projectDataList.length;

		// Iterate over data and create Project Grid Items
		$(_ref.projectDataList).each( function(i, data)
		{
			context = $.extend( data, {index:i, type:"project"} );
			element = $( _ref.gridItemTemplate( context ) );
			_ref.$projectList.append( element );
		});

		// Set GridItems
		_ref.$projectGridItems = $(_sel.gridItem, this.$projectList );
		// Update Grid
		updateLayout();
	}


	/**
	 * Update Section Layout based on number of grid columns created by the Stylesheet
	 * @return {none}
	 */
	function updateLayout()
	{
		var g = _ref.grid
			, prependIndex, prependTarget;

		g.gWidth = _ref.$projectList.width();
		g.cWidth = _ref.$projectGridItems.outerWidth();
		g.cols = Math.round( g.gWidth / g.cWidth );
		g.rows = Math.ceil( _ref.projectCount / g.cols );

		prependIndex = getProjectPrependIndex( _ref.activeGridIndex );

		if( _ref.prependIndex !== prependIndex ) {
			prependTarget = _ref.$projectList.find("[data-index=" + prependIndex + "]");
			prependTarget.before( _ref.$activeView );
			_ref.prependIndex = prependIndex;
		}
	}


	// ------------------------------------------------------------------------------------------
	// Event Handlers
	// ------------------------------------------------------------------------------------------	


	function handleProjectClose( event ) 
	{
		event.preventDefault();
		event.stopImmediatePropagation();
		var project = $(this).parents(".project").data("project");
		History.pushState( {}, null, "/work" );
	}



	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	SectionWork.extend( fiveleft.SectionAbstract );
	fiveleft.SectionWork = SectionWork;

}($);

