if( typeof fiveleft == "undefined" ) fiveleft = {};

!function($){
	
	var _defaultConfig = {
		classes : {
			active : "active"
			,inactive : "inactive"
			,swiped : "swiped"
			,selected : "selected"
		}
		,selectors : {
			active : ".active"
			,inactive : ".inactive"
			,selected : ".selected"
		}
		,scroll : {
			minTime : 0.35
			,maxTime : 1.75
			,ease : Expo.easeInOut
		}
	}


	/** 
	 * SectionAbstract Consturctor
	 *  configure, define shortcuts and initialize
	 */
	function SectionAbstract() {
		this._init();
	}


	SectionAbstract.prototype = {

		constructor : SectionAbstract

		/** 
		 * Namespace is intended to be overridden
		 */
		, classname : "SectionAbstract"


		/**
		 * Default Configuration
		 */
		, init : function(){}
		, initListeners : function(){}
		, onMediaQueryChange : function(){}
		, onSiteDataLoaded : function(){}
		, onStart : function(){}
		, resize : function(){}
		, scroll : function(){}
		, activate : function(){}
		, deactivate : function(){}
		, top : 0
		, bottom : 0
		, id : 0
		, index : 0
		, started : false
		, url : ""
		, path : []


		/**
		 * Subclass's Initialization
		 */
		, _init : function( element, options ) 
		{
			// Set Elements
			this.html = $("html");
			this.body = $("body");
			this.window = $(window);
			this.element = $(element);
			this.inner = $( ".section-inner", this.element );
			this.id = element.attr("data-id");
			this.url = element.attr("data-url");
			this.navItem = $("a[data-id=\"" + this.id + "\"]");

			// Set Properties
			this.started = false;
			this.appData = fiveleft.applicationData;
			this.config = {};
			$.extend( true, this.config, _defaultConfig, options||{} );
			
			// Paths
			this.path = element.attr("data-path") ? element.attr("data-path").split(",") : [];

			// Section Data
			this.element.data("section", this);

			// Subclass init()
			this.init();
			this._initListeners();
			this.onMediaQueryChange();
		}


		/**
		 * [_initListeners description]
		 */
		, _initListeners : function()
		{
			this.window
				.on( fiveleft.Event.MediaQueryChange, $.proxy(this, "onMediaQueryChange" ) )
				.one( fiveleft.Event.SiteDataLoaded, $.proxy(this, "onSiteDataLoaded" ) )
				.one( fiveleft.Event.Start, $.proxy(this, "start") );

		}


		/**
		 * [hasPath description]
		 * @param  {[type]}  path [description]
		 * @return {Boolean}      [description]
		 */
		, hasPath : function( path ) {
			var match = $.inArray( path[0], this.path );
			return match > -1 ? this.path[match] : false;
		}


		, start : function(){
			this.started = true;
			this.onStart();
		}



		, target : function () 
		{	
			// this is intended to be overridden, but if not, scroll to the target section.
			this.scrollToPosition( this.top );
		}


		/**
		 * [scrollToPosition description]
		 * @param  {[type]} y [description]
		 * @return {[type]}   [description]
		 */
		, scrollToPosition : function( y )
		{
			var pageHeight = this.body.height()
				,targetY = y||0
				,scope = this
				,distY, distRatio, time;

			// if the target is beyond the scroll area max
			if( targetY > this.body.height() - this.window.height() ) {
				targetY = this.body.height() - this.window.height();
			}

			

			// Find Distance Ratio to give a pleasant time.
			distY = Math.abs( targetY - this.window.scrollTop() );
			distRatio = distY/pageHeight;
			time = ratioOf( distRatio, this.config.scroll.minTime, this.config.scroll.maxTime );

			// Prevents scrollTo from animating skipped sections 
			TweenMax.to( window, time, {scrollTo:{y:targetY}, ease:this.config.scroll.ease, onComplete:this.scrollToPositionComplete, onCompleteScope:scope});
		}


		/**
		 * [scrollToPositionComplete description]
		 * @return {[type]} [description]
		 */
		, scrollToPositionComplete : function() 
		{
			// log( this.id, "::scrollToPositionComplete" );
		}


	};
	
	/** 
	 * Namespace Class Definition
	 */
	fiveleft.SectionAbstract = SectionAbstract;


}($);


// REMOVED
// 

		// , startScrollSpy : function() 
		// {
		// 	this.scrollspy = true;
		// 	this.watchScroll(true);
		// 	this.updateScrollSpy();
		// }

		// , stopScrollSpy : function()
		// {
		// 	this.scrollspy = false;
		// 	this.watchScroll(false);
		// 	this.element.removeAttr("data-scroll");
		// }

		// , updateScrollSpy : function()
		// {
		// 	if( !this.scrollspy ) return;

		// 	var min = Math.max( 0, this.window.scrollTop() )
		// 		,wh = window.innerHeight 
		// 		,max = min + wh
		// 		,base = 0
		// 		,scrollActive = false
		// 		,scrollState;

		// 	this.top = Math.floor( this.element.offset().top );
		// 	this.bottom = Math.ceil( this.top + this.element.outerHeight() );

		// 	switch( true ) 
		// 	{
		// 		case (this.top <= min && this.bottom >= max ) :
		// 			scrollState = "fill-viewport";
		// 			scrollActive = true;
		// 			break;
		// 		case (this.top >= min && this.bottom <= max ) :
		// 			scrollState = "inside-viewport";
		// 			scrollActive = true;
		// 			break;
		// 		case (this.top > min && this.top < max && this.bottom > max ) :
		// 			scrollState = "top-inside-viewport";
		// 			break;
		// 		case this.bottom > min && this.bottom < max && this.top < min :
		// 			scrollState = "bottom-inside-viewport";
		// 			break;
		// 		case (this.top >= max) : 
		// 			scrollState = "below-viewport";
		// 			break;
		// 		case (this.bottom <= min) : 
		// 			scrollState = "above-viewport";
		// 			break;
		// 		default : 
		// 			scrollState = "unknown";
		// 			break;
		// 	}

		// 	this.element.attr("data-scroll", scrollState);

		// 	if( this.scrollActive !== scrollActive ) {
		// 		this.scrollActive = scrollActive;
		// 		this[(scrollActive ? "activate" : "deactivate")]();
		// 	}
		// }



		// /**
		//  * [_onMediaQueryChange description]
		//  */
		// , _onMediaQueryChange : function() {
		// 	this.onMediaQueryChange();
		// }


		// /**
		//  * [_onSiteDataLoaded description]
		//  */
		// , _onSiteDataLoaded : function() {
		// 	this.onSiteDataLoaded();
		// 	// this._onResize();
		// }


		// /**
		//  * [_onSiteDataLoaded description]
		//  */
		// , _onStart : function() 
		// {
		// 	this.startScrollSpy();
		// 	this.start();
		// }


		// /**
		//  * [_onScroll description]
		//  * @return {[type]} [description]
		//  */
		// , _onScroll : function()
		// {
		// 	if( this.scrollspy ) this.updateScrollSpy();
		// 	this.scroll();
		// }


		// /**
		//  * [_resize description]
		//  * @return {[type]} [description]
		//  */
		// , _onResize : function()
		// {
		// 	if( this.scrollspy ) this.updateScrollSpy();
		// 	this.resize();
		// }


		/**
		 * [_resize description]
		 * @return {[type]} [description]
		, watchScroll : function( value ) 
		{
			var scope = this;
			// this.window[(value ? "on" : "off")]( "scroll", function(){scope._onScroll()} );
		}
		 */

		/**
		 * [_resize description]
		 * @return {[type]} [description]
		, watchResize : function( value ) 
		{
			var scope = this;
			this.window[(value ? "on" : "off")]( "resize", function(){scope._onResize()} );
		}
		 */
