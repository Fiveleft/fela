!function($){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;
	
	// Shortcuts
	var _ref
		,_cn = "Application"
		,_cls
		,_sel
		,_evt
		,scroll = {
			position : 0
			,height : 0
			,ratio : 0
			,ticks : 0
			,tickInterval : 5
			,timeout : 0
			,interval : 200
		}
		,resize = {
			timeout : 0
			,interval : 200
		};



	/**
	 * Application Constructor
	 */
	var Application = function( options ) 
	{
		this.config = $.extend( true, this.defaults, options||{} );
		_ref = this;
		_cls = this.config.classes;
		_sel = this.config.selectors;
		_evt = fiveleft.Event;
		this.init();
	};


	/**
	 * Application Prototype
	 */
	Application.prototype = {
		
		constructor : Application
		

		, defaults : {
			classes : {
				beforeStart : "beforeStart"
				,drawClosing : "draw-closing"
				,drawOpen : "draw-open"
				,drawOpening : "draw-opening"
				,navClosing : "nav-closing"
				,navOpen : "nav-open"
			}
			, selectors : {
				historyLinks : "[href^='/']"
				,drawLinks : "[href='/draw'], [href='#draw-close']"
				,section : ".section"
				,sectionInner : ".section-inner"
			}
		}


		/**
		 * Init Class
		 */
		, init : function() {
			this.initProperties();
			this.initListeners();
			this.load();
		}
		
		
		/**
		 * Init Class Properties
		 */
		, initProperties : function() 
		{
			// Elements
			this.html = $("html");
			this.body = $("body");
			this.$window = $(window);
			this.$header = $("header");
			this.$topNav = $( "#top-nav" );
			this.$mobileNav = $( "#mobile-nav" );
			this.$main = $( "#main" );
			this.$mainInner = $(".main-inner", this.$main );
			this.$sections = $( ".main-inner > section", this.$main );
			this.$drawLinks = $( _sel.drawLinks );
			this.$links = $( _sel.historyLinks );

			// History
			History.options.disableSuid = true;
			this.historyReady = typeof History.getState() !== "undefined";

			// Properties
			this.started = false;
			this.appData = fiveleft.applicationData = new fiveleft.ApplicationData();
			this.drawingApi = fiveleft.drawingApi = new fiveleft.DrawingAPI();

			// FontsLoaded hook (see index.php for connection to typekit)
			if( !fiveleft.fontsloaded ) fiveleft.onfontloaded = this.fontsLoadComplete();

			// Navigation
			this.navigation = new fiveleft.NavigationView( $("#header") );

			// Sections
			var sectionList = [];
			function addSection( s ){
				sectionList.push( s );
				s.element.attr("data-scroll", "unmeasured");
				return s;
			}

			this.welcomeSection = addSection( new fiveleft.SectionWelcome($("#welcome-section", this.$main)) );
			this.workSection = addSection( new fiveleft.SectionWork($("#work-section", this.$main)) );
			this.infoSection = addSection( new fiveleft.SectionInfo($("#info-section", this.$main)) );
			this.connectSection = addSection( new fiveleft.SectionConnect($("#connect-section", this.$main)) );
			this.drawingSection = addSection( new fiveleft.SectionDrawing($("#drawing-section")) );
			this.sectionList = sectionList;
		}

		
		, initListeners : function() 
		{
			this.body
				.on( "click", _sel.historyLinks, handleHistoryClickEvent );

			this.$window
				.one( _evt.SiteDataLoaded, handleLoadComplete )
				.one( _evt.SiteDataError, handleCriticalLoadError )
				.on( "scroll", handleScroll )
				.on( ["resize", "orientationchange", _evt.DOMChange].join(" "), handleResize )
				.on( [_evt.OpenMenu, _evt.CloseMenu].join(" "), handleMenuToggle )
				.on( [_evt.IntroSequenceChange, _evt.IntroSequenceComplete].join(" "), handleIntroSequence );

			this.$drawLinks
				.on( "click", handleDrawClick );
		}


		, load : function() 
		{
			log( _cn+"::load" );
			this.appData.loadSiteData();
		}


		, fontsLoadComplete : function()
		{
			fiveleft.fontsloaded = true;
			this.ready();
		}


		, ready : function()
		{
			// log( _cn+"::ready | fontsLoaded = " + fiveleft.fontsloaded + " | historyReady = " + this.historyReady + " | dataLoaded = " + this.appData.dataLoaded );
			if( fiveleft.fontsloaded && this.historyReady && this.appData.dataLoaded ) {

				// log( "** " + _cn + "::ready() **" );
				History.Adapter.bind(window,'statechange',handleHistoryStateChange);
				
				this.drawingApi.init( $("#canvas-drawing")[0] );
				// this.drawingApi.setSize();

				this.body.attr( "data-loadstate", "intro" );

				// this.body.removeAttr( "data-loadstate" );
				_ref.$window.trigger( _evt.DOMChange );

				setTimeout( _ref.start, 500 );
			}
		}

		, start : function()
		{
			log( _cn+"::handleStart");
			
			_ref.started = false;
			_ref.$window.trigger( _evt.Start );

			// Base Starting View State on appData.introCompleted:
			if( !_ref.appData.introCompleted ) {
				fiveleft.drawingApi.startIntro( $("canvas.hero-canvas") );
			}else{
				fiveleft.drawingApi.start();
				_ref.body.removeAttr( "data-loadstate" );
			}
			targetSection();
		}
	};



	function handleScroll()
	{
		// log( _cn+"::handleScroll" );

		// Handle Immediate Scroll updates
		scroll.position = _ref.$window.scrollTop();
		scroll.ratio = clamp( scroll.position/scroll.height, 0, 1 );

		fiveleft.drawingApi.setScrollRatio( scroll.ratio );
		fiveleft.drawingApi.pause();

		// Update Intermittent Scroll Responses
		clearTimeout( scroll.timeout );
		scroll.timeout = setTimeout( handleScrollTimeout, scroll.interval );

		// Only update the scroll on the views at a specified interval
		if( scroll.ticks ++ % scroll.tickInterval === 0 ) {
			updateViewStates();
		}
	}


	function handleScrollTimeout()
	{
		// log( "Application::handleScrollTimeout" );
		clearTimeout( scroll.timeout );
		scroll.timeout = 0;		
		fiveleft.drawingApi.resume();
	}


	function handleResize( event )
	{
		log( _cn+"::handleResize" );

		// Update The Scroll Area Height
		scroll.height = _ref.$mainInner.outerHeight() - _ref.$window.height();
		// log( scroll.height );

		// Force Scroll Handling without triggering the scroll.tickInterval
		scroll.ticks = 1;
		handleScroll();		

		// Set DrawingAPI size
		fiveleft.drawingApi.setSize();

		if( event.type == "orientationchange" ) {
			updateViewStates(true);
			return;
		}
		clearTimeout( resize.timeout );
		resize.timeout = setTimeout( applyResize, resize.interval );
	}


	function applyResize()
	{
		clearTimeout( resize.timeout );
		resize.timeout = 0;
		updateViewStates( true );
	}


	function updateViewStates( resize )
	{
		// log( _cn+"::updateViewStates" );

		var scrollTop = _ref.$window.scrollTop()
			,winH = window.innerHeight
			,min = Math.max( 0, scrollTop )
			,max = min + winH
			,currScrollState = ""
			,scrollState = "";

		$(_ref.sectionList).each( 
			function(index, section) {

				section.top = Math.floor( section.element.offset().top );
				section.bottom = Math.ceil( section.top + section.element.outerHeight() );
				currScrollState = section.element.attr("data-scroll");

				switch( true )
				{
					case (section.top <= min && section.bottom >= max ) :
						scrollState = "fill-viewport";
						break;
					case (section.top >= min && section.bottom <= max ) :
						scrollState = "inside-viewport";
						break;
					case (section.top > min && section.top < max && section.bottom > max ) :
						scrollState = "top-inside-viewport";
						break;
					case section.bottom > min && section.bottom < max && section.top < min :
						scrollState = "bottom-inside-viewport";
						break;
					case (section.top >= max) : 
						scrollState = "below-viewport";
						break;
					case (section.bottom <= min) : 
						scrollState = "above-viewport";
						break;
					default : 
						scrollState = "unknown";
						break;
				}

				if( resize ) {
					section.resize();
				}

				if( currScrollState !== scrollState ) {
					section.element.attr( "data-scroll", scrollState );
					section.scroll( scrollState );
				}

			}
		);
	}


	
	// ------------------------------------------------------------------------------------------
	// Intro Event Handlers
	// ------------------------------------------------------------------------------------------


	function handleIntroSequence( event, step ) 
	{	
		var complete = event.namespace === "IntroSequenceComplete"
			,step = step||0;
	
		// log( "Application::handleIntroSequence\n\tevent = " + event.namespace, "\n\tstep = " + step );
	
		if( complete ) {
			fiveleft.drawingApi.fromIntro();
			_ref.body.removeAttr( "data-loadstate" );
		}
	}


	
	// ------------------------------------------------------------------------------------------
	// UI Event Handlers
	// ------------------------------------------------------------------------------------------

	/**
	 * [handleDrawClick description]
	 * @param  {[type]} event [description]
	 */
	function handleDrawClick( event )
	{
		event.preventDefault();
		event.stopImmediatePropagation();
		log( " handle draw click ");
	}


	/**
	 * [handleMenuToggle description]
	 * @param  {fiveleft.Event} event [description]
	 * @param  {Number} mw    target menu width
	 * @return {none}
	 */
	function handleMenuToggle( event, mw )
	{
		var open = (event!==undefined && event.namespace === "OpenMenu")
			,menuWidth = mw||0
			,time = _ref.appData.getMediaQuery("mobile").matches ? 0.2 : 0.35
			,ease = Expo.easeInOut
			,onComplete = open ? openMenuComplete : closeMenuComplete;

		// Make sure the Menu's position is correct
		if( open ) {
			_ref.$topNav.css({"left" : -menuWidth+"px"});
		}

		// Apply classes
		_ref.html
			.toggleClass( _cls.navClosing, !open )
			.toggleClass( _cls.navOpen, open );

		// 
		TweenLite.to( [_ref.$main, _ref.$header], time, { marginLeft:menuWidth+"px", ease:ease, onComplete:onComplete });
	}


	function openMenuComplete()
	{
		// log( _cn+"::openMenuComplete" );
		_ref.$window.trigger( fiveleft.Event.OpenMenuComplete );
	}


	function closeMenuComplete()
	{
		// log( _cn+"::closeMenuComplete" );
		_ref.html.removeClass( _cls.navOpen + " " + _cls.navClosing );			
		_ref.$window.trigger( fiveleft.Event.CloseMenuComplete );
	}



	/**
	 * [targetSection description]
	 * @return {[type]} [description]
	 */
	function targetSection() 
	{
		var path = /^#\.\//.test(location.hash) ? location.hash.replace(/#\.\//, "") : location.pathname.replace( /^\//, "" )
			,section;

		// If path undefined, go home.
		path = path.split("/");
		path = (path[0].length === 0) ? ["welcome"] : path;
		// log( location.hash.replace(/#\.\//, "XXX") + " | path: " + path + " | location.pathname: " + location.pathname, " | location.hash: " + location.hash );

		// If the mobile navigation is open, close it
		if( _ref.navigation.isOpen ) {
			handleMenuToggle();
		}

		// Find section and target it.
		_ref.$sections.each( function( i,s ) {
			section = $(s).data("section");
			if( section.hasPath( path ) ) {
				section.target( path );
			}
		});
	}

	
	// ------------------------------------------------------------------------------------------
	// History Event Handler Methods
	// ------------------------------------------------------------------------------------------


	function handleHistoryClickEvent( evt ) 
	{	
		log( _cn + "::handleHistoryClickEvent", $(this) );
		evt.preventDefault();
		var path = $(this).attr('href');
		History.pushState( {}, null, path );
		// targetSection();
	}


	function handleHistoryStateChange( event )
	{
		log( _cn + "::handleHistoryStateChange" );
		targetSection();
	}


	/**
	 * Handle Critical Load Error
	 * @param result Object 
	 */
	function handleCriticalLoadError( result ) 
	{

		log("Application::handleCriticalLoadError", result);
	}


	/**
	 * Handle Load Complete
	 * @param Event event 
	 */
	function handleLoadComplete( event ) 
	{
		if( !event || event.namespace !== "SiteDataLoaded" ) return;
		_ref.ready();
	}
	

	
	// ------------------------------------------------------------------------------------------
	// Application Namespace
	// ------------------------------------------------------------------------------------------
	

	fiveleft.Application = Application;
	
}($);





	// /**
	//  * [handleDrawToggle description]
	//  * @param  {[type]} event [description]
	//  * @return {[type]}       [description]
	//  */
	// function handleDrawToggle( event )
	// {
	// 	log( _cn+"::handleDrawToggle", event.namespace );
	// 	// var drawOpen = event.namespace === "OpenDraw"
	// 	if( event.namespace === "OpenDraw" ) {
	// 		openDraw();
	// 	}else{
	// 		closeDraw();
	// 	}
	// }


	// function openDraw() 
	// {
	// 	_ref.html
	// 		.removeClass( _cls.drawOpen + " " + _cls.drawClosing )
	// 		.addClass( _cls.drawOpening );
	// 	TweenLite.to( _ref.$mainInner, 0.7, { marginLeft:"-100%", ease:Cubic.easeInOut, onComplete:openDrawComplete });
	// }


	// function openDrawComplete()
	// {
	// 	log( _cn+"::openDrawComplete" );
	// 	_ref.html
	// 		.removeClass( _cls.drawOpening )
	// 		.addClass( _cls.drawOpen );
	// 	_ref.$window.trigger( fiveleft.Event.OpenDrawComplete );
	// }


	// function closeDraw() 
	// {
	// 	_ref.html
	// 		.removeClass( _cls.drawOpen + " " + _cls.drawOpening )
	// 		.addClass( _cls.drawClosing );
	// 	TweenLite.to( _ref.$mainInner, 0.7, { marginLeft:"0", ease:Cubic.easeInOut, onComplete:closeDrawComplete });
	// }
	// function closeDrawComplete()
	// {
	// 	// log( _cn+"::closeDrawComplete" );
	// 	_ref.html.removeClass( _cls.drawClosing );			
	// 	_ref.$window.trigger( fiveleft.Event.CloseDrawComplete );
	// }