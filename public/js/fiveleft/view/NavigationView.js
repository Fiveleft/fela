if( typeof fiveleft == "undefined" ) fiveleft = {};

!function($){
	
	var _cn = "NavigationView";
	var _ref;	/* Shortcut to "this" scope */
	var _cfg;	/* Shortcut to configuration */
	var _sel;	/* Shortcut to selector configuration  */
	var _cls;	/* Shortcut to classes configuration  */
	var _evt;	/* Shortcut to events */

	var isOpen = false
		,tabletMQ = null
		,appData;


	/** 
	 * NavigationView Consturctor
	 *  configure, define shortcuts and initialize
	 * @param element {DOMElement} - component DOM element container
	 * @param options {Object} - configuration override
	 */
	function NavigationView( element, options ) {
		
		this.element = $(element);
		this.config = $.extend( true, this.defaults, options||{} );

		// Shortcuts
		_ref = this;
		_cfg = this.config;
		_sel = this.config.selectors;
		_cls = this.config.classes;
		_evt = fiveleft.Event;

		// Initialize Class
		this.init();
	}


	NavigationView.prototype = {


		/* Preserve Constructor */
		constructor : NavigationView


		/**
		 * Default Configuration
		 */
		, defaults : {
			classes : {
				fixed : "fixed"
				,closing : "nav-closing"
				,open : "nav-open"
				,opening : "nav-opening"
				,drawClosing : "draw-closing"
				,drawOpen : "draw-open"
				,drawOpening : "draw-opening"
				,active : "active"
			}
			,selectors : {}
			, templates : {
				subItemTemplate : "#nav-subitem-template"
			}
		}


		/**
		 * Initialize Class
		 */
		, init : function() {
			this.initProperties();
			this.initListeners();
		}


		/**
		 * Initialize Class Properties
		 */
		, initProperties : function() {
			
			// Elements
			this.html = $("html");
			this.window = $(window);
			this.topNav = $("#top-nav", this.element);
			this.topNavContainer = $( ".top-nav-container", this.element );
			this.topNavItemList = $( ".top-nav-items", this.element );
			this.navLink = $( ".nav-link", this.element );
			this.logo = $( ".logo", this.topNavContainer );
			this.logoBox = $(".fiveleft-logo", this.logo );
			this.mobileNav = $("#mobile-nav", this.element); 
			this.menuTrigger = $(".menu-trigger", this.mobileNav);
			// this.drawTrigger = $(".draw-trigger", this.mobileNav);
			// this.drawOpen = $(".draw-open", this.drawTrigger );
			// this.drawClose = $(".draw-close", this.drawTrigger );
			this.siteLock = $(".site-lock", this.mobileNav);

			// Properties
			this.isOpen = this.html.hasClass( _cls.open );
			appData = fiveleft.applicationData;
			// tabletMQ = appData.getMediaQuery( "tablet-max" );
			// window.nv = this;
		}


		/**
		 * Initialize Class Event Listeners
		 */
		, initListeners : function() 
		{
			// Application Listeners
			this.window
				// .on( _evt.SiteDataLoaded, createSubNavigation )
				.on( _evt.OpenMenuComplete, openMenuComplete )
				.on( _evt.CloseMenuComplete, closeMenuComplete )
				.on( _evt.MediaQueryChange, handleMediaQueryChange );

			// UI Listeners
			this.menuTrigger.on( "click", toggleMobileMenu );
			// this.drawTrigger.on( "click", "a", toggleMobileDraw );
			this.siteLock.on( "touchstart mousedown click", handleSiteLock );


			// // MediaQuery Listeners
			// if( tabletMQ ) {
			// 	log( "adding tabletMQ listener ", tabletMQ.matches );
			// 	tabletMQ.addListener( handleTabletMediaQuery );
			// }
		}

		, openMenu : function() 
		{
			var menuWidth = _ref.topNav.width();
		}

		, closeMenu : function()
		{

		}
	};


	function handleMediaQueryChange()
	{
		// log( _cn + "::handleMediaQueryChange", appData.mobileLayout, _ref.isOpen );
		if( !appData.mobileLayout ) {
			_ref.topNav.css({"left":"auto"});
			if( _ref.isOpen ) toggleMobileMenu();
		}

	}


	function handleSiteLock( evt )
	{
		// log( _cn + "::handleSiteLock", evt );
		evt.preventDefault();
		evt.stopPropagation();
	}


	// function toggleMobileDraw( evt )
	// {
	// 	if( evt ) evt.preventDefault();
	// 	_ref.isDrawOpen = !_ref.html.hasClass( _cls.drawOpen );

	// 	// log( "toggleMobileDraw", _ref.isDrawOpen );

	// 	if( _ref.isDrawOpen ) {
	// 		_ref.window.trigger( fiveleft.Event.OpenDraw );
	// 	} else {
	// 		_ref.window.trigger( fiveleft.Event.CloseDraw );
	// 	}
	// }


	function toggleMobileMenu( evt )
	{
		if( evt ) evt.preventDefault();
		var menuWidth = _ref.topNav.width();
		_ref.isOpen = !_ref.html.hasClass( _cls.open );

		if( _ref.isOpen ) {
			_ref.window.trigger( fiveleft.Event.OpenMenu, menuWidth );
			_ref.topNav.one( "swipeleft", toggleMobileMenu );
		} else {
			_ref.window.trigger( fiveleft.Event.CloseMenu );
		}
	}

	function openMenuComplete( evt )
	{
	}

	function closeMenuComplete( evt )
	{
		// _ref.html.removeClass( _cls.open + " " + _cls.closing );
	}



	/**
	 * Handle Project Data Load Complete
	 */ 
	function handleSectionChange( event, data ) 
	{
		// log( "NavigationView::handleSectionChange  ", event.namespace, data );
		var element
			, id
			, active;

		_ref.topNavLink.each( function(i,el) {
			element = $(el);
			id = element.attr("data_id");
			active = (id=="grid" && data=="project") ? true : id == data;
			element.toggleClass( _cls.active, active );
		});
	}

	
	/** 
	 * Namespace Class Definition
	 */
	fiveleft.NavigationView = NavigationView;


}($);



	// ------------------------------------------------------------------------------------------
	// Private Methods
	// ------------------------------------------------------------------------------------------
			

	// /** 
	//  * Create Sub Navigations 
	//  */
	// function createSubNavigation() {

	// 	// var projs = _ref.appData.getProjects().slice( 0, 6 )
	// 	// 	,techs = _ref.appData.getTechnologies().slice( 0, 6 )
	// 	// 	,discp = _ref.appData.getDisciplines().slice( 0, 6 )
	// 	// 	,firstProj = $("li", _ref.projectSubNav).first()
	// 	// 	,firstTech = $("li", _ref.technologySubNav).first()
	// 	// 	,firstDisc = $("li", _ref.disciplineSubNav).first()
	// 	// 	,i
	// 	// 	,context;

	// 	// for( i=projs.length-1; i>=0; i-- ) {
	// 	// 	context = $.extend( {type:"project", index:i}, projs[i] );
	// 	// 	firstProj.after( _ref.subNavItemTemplate(context) );
	// 	// }
	// 	// for( i=techs.length-1; i>=0; i-- ) {
	// 	// 	context = $.extend( {type:"technology", index:i}, techs[i] );
	// 	// 	firstTech.after( _ref.subNavItemTemplate(context) );
	// 	// }
	// 	// for( i=discp.length-1; i>=0; i-- ) {
	// 	// 	context = $.extend( {type:"discipline", index:i}, discp[i] );
	// 	// 	firstDisc.after( _ref.subNavItemTemplate(context) );
	// 	// }
	// }



	// /**
	//  * Close Navigation
	//  */ 
	// function closeNav()
	// {
	// 	if( !_ref.isOpen ) {
	// 		closeNavComplete();
	// 		return;
	// 	}
	// 	_ref.isOpen = false;

	// 	// Set "Close" class while clearing others
	// 	_ref.element.removeAttr("class")
	// 		.addClass( _cls.closing );

	// 	TweenLite.killTweensOf( _ref.background );
	// 	TweenLite.killTweensOf( _ref.subNavContainer );
	// 	TweenLite.killTweensOf( _ref.subNavInner );
	// 	TweenLite.to( _ref.subNavInner, 0.15, {autoAlpha:0, clearProps:"visibility, opacity", ease:Cubic.easeOut});
	// 	TweenLite.to( _ref.subNavContainer, 0.2, {delay:0.12, height:0, clearProps:"height", ease:Cubic.easeInOut});
	// 	TweenLite.to( _ref.background, 0.2, {delay:0.15, height:3, clearProps:"height", ease:Cubic.easeInOut, onComplete:closeNavComplete} );
	// }
	// function closeNavComplete()
	// {
	// 	_ref.isOpen = false;
	// 	// Clear Opened Classes
	// 	_ref.element.removeAttr("class");
	// 	// Trigger Application Event
	// 	_ref.window.trigger( _evt.TopNavMenuClose );

	// 	if( _ref.closeNavCallback !== null ) {
	// 		_ref.closeNavCallback();
	// 		_ref.closeNavCallback = null;
	// 	}
	// }


	// /**
	//  * Open Navigation
	//  */ 
	// function openNav() 
	// {
	// 	if( _ref.isOpen ) {
	// 		openNavComplete();
	// 		return;
	// 	}
	// 	_ref.isOpen = true;

	// 	// Set "Open" class while clearing others
	// 	_ref.element.removeAttr("class")
	// 		.addClass( _cls.opening );

	// 	var targetHeight = _ref.subNavInner.height();

		
	// 	TweenLite.killTweensOf( _ref.background );
	// 	TweenLite.killTweensOf( _ref.subNavContainer );
	// 	TweenLite.killTweensOf( _ref.subNavInner );
	// 	TweenLite.to( _ref.background, 0.3, {height:"100%", ease:Cubic.easeInOut} );
	// 	TweenLite.to( _ref.subNavContainer, 0.3, {height:targetHeight, delay:0.05, ease:Cubic.easeInOut} );
	// 	TweenLite.to( _ref.subNavInner, 0.15, {delay:0.3, autoAlpha:1, ease:Cubic.easeOut, onComplete:openNavComplete});

	// 	// Trigger Application Event
	// 	_ref.window.trigger( _evt.TopNavMenuOpen );
	// }


	// /** 
	//  * Open Nav Complete 
	//  *	called by openAnimation.onComplete
	//  */ 
	// function openNavComplete() 
	// {
	// 	// Set Opened Class
	// 	_ref.element.removeAttr("class")
	// 		.addClass( _cls.open );
	// }



	// ------------------------------------------------------------------------------------------
	// Event Handler Methods
	// ------------------------------------------------------------------------------------------
	

	// /**
	//  * Handle TopNav Link Click
	//  * @param event Event
	//  */
	// function handleOpenMenuClick( event ) 
	// {
	// 	event.preventDefault();
	// 	if( _ref.isOpen ) {
	// 		closeNav();
	// 	}else{
	// 		openNav();
	// 	}
	// }



	// function handleNavItemClick( event ) 
	// {
	// 	var el = $(this)
	// 		,parent = el.parent()
	// 		,menu = el.parents(".sub-nav-items")
	// 		,menuType = menu.attr("data_type")
	// 		,id = el.attr("data_id")
	// 		,href = el.attr("href")
	// 		,anchor = href.search( /#/ ) > -1
	// 		,appEvent
	// 		,close = true
	// 		,data = {};

	// 	switch( true ) 
	// 	{
	// 		case parent.is( ".sub-nav-trigger" ) :
	// 			close = false;
	// 			// openNav();
	// 			break;

	// 		case parent.is( ".top-nav-item" ) : 
	// 			appEvent = _evt.TopNavItemClick;
	// 			data.section = id;
	// 			break;

	// 		case parent.is( ".sub-nav-title"  ) :
	// 		case parent.is( ".view-options"  ) :
	// 			appEvent = _evt.TopNavSubCategoryClick;
	// 			data.section = "grid";
	// 			data.category = menu.attr("data_type");
	// 			break;

	// 		case parent.is( ".sub-nav-item"  ) && menuType == "projects" :
	// 			appEvent = _evt.TopNavProjectClick;
	// 			data.section = "project";
	// 			data.target = el.attr("data_id");
	// 			break;

	// 		case parent.is( ".sub-nav-item"  ) :
	// 			appEvent = _evt.TopNavSubItemClick;
	// 			data.section = "grid";
	// 			data.category = el.attr("data_type");
	// 			data.target = el.attr("data_id");
	// 			break;

	// 		case el.is( ".connect-item"  ) :
	// 			close = false;
	// 			appEvent = _evt.TopNavSocialItemClick;
	// 			data.type = href.substring(1);
	// 			break;
	// 	}

	// 	// End of statement conditionals
	// 	if( anchor ) event.preventDefault();


	// 	log( _cn + "::handleNavItemClick", appEvent, id, menuType );


	// 	if( close ) {
	// 		if( appEvent ) {
	// 			_ref.closeNavCallback = function() {
	// 				_ref.window.trigger( appEvent, data );
	// 			}
	// 		}
	// 		closeNav();
	// 	}else{
	// 		if( appEvent ) {
	// 			_ref.window.trigger( appEvent, data );	
	// 		}
	// 	};
	// }



	/**
	 * Handle TopNav Link Click
	 * @param e Event
	 	function handleNavItemClick( e ) 
	{
		var el = $(this)
			,parent = el.parent()
			,section = el.attr("data_id")
			,href = el.attr("href")
			,anchor = href.search( /#/ ) > -1
			,close = true
			,data = {}
			,event; 

		// log( "NavigationView::handleNavLinkClick", parent );

		switch( true ) {

			case section !== undefined && el.is("[data_id=welcome]" ) : 
				event = _evt.TopNavHomeClick;
				data.section = section;
				showActiveNav(section);
				break;

			case section !== undefined && parent.is(".sub-nav-trigger" ) : 
				event = _evt.TopNavItemTrigger;
				data.section = section;	
				close = false;
				showActiveNav(section);
				openNav();
				break;

			case section !== undefined && parent.is(".nav-item" ) :
				event = _evt.TopNavItemClick;
				data.section = section;
				showActiveNav( section );
				break;

			case parent.is(".nav-item-project" ) :
				event = _evt.TopNavProjectClick;
				data.section = "project";
				data.target = el.attr("data_id");
				showActiveNav("grid");
				break;

			case parent.is(".nav-item-discipline" ) || parent.is(".nav-item-technology" ) :
				event = _evt.TopNavSubItemClick;
				data.section = "grid";
				data.category = el.attr("data_type");
				data.target = el.attr("data_id");
				showActiveNav( section );
				break;

			case parent.is(".nav-title") || parent.is(".view-option") : 
				event = _evt.TopNavSubCategoryClick;
				data.section = "grid";
				data.category = el.parent("ul").attr("data_type");
				showActiveNav( data.section );
				break;

			case el.is(".connect-item") : 
				close = false;
				event = _evt.TopNavSocialItemClick;
				data.type = href.substring(1);
				break;
		}

		// End of statement conditionals
		if( anchor ) e.preventDefault();
		if( close ) closeNav();

		//log( event, data );
		_ref.window.trigger( event, data );	
	}
	 */

	// /**
	//  * Handle Navigation Row Hover
	//  * @param  {Event} event mouseenter|mouseleave
	//  */
	// function handleNavHover( event ) 
	// {
	// 	if( _ref.appData.isMobile() || _ref.appData.isMobileSize() ) return;
	// 	if( event.type == "mouseenter" ) {
	// 		openNav();
	// 	}else{
	// 		closeNav();
	// 	}
	// }

	// /** 
	//  * Hide Nav Complete
	//  */
	// function showNav() {
	// 	_ref.hidden = false;
	// }


	// /** 
	//  * Show Nav Complete
	//  */
	// function showNavComplete() 
	// {
	// 	_ref.showing = true;
	// }


	// /** 
	//  * Hide Nav Complete
	//  */
	// function hideNav() 
	// {
	// 	_ref.showing = false;
	// }


	// /** 
	//  * Hide Nav Complete
	//  */
	// function hideNavComplete() 
	// {
	// 	_ref.hidden = true;
	// }

