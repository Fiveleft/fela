
!function($){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;
		
	/* Shortcuts */
	var _cn = "SectionDrawing", _ref, _cfg, _sel, _cls, _evt;

	var baseOffset
		,appData
		,drawingApi
		,scrollArea
		,loadQueue;


	/** 
	 * SectionDrawing Consturctor
	 *  configure, define shortcuts and initialize
	 * @param element {DOM Element} - element acting as root of component
	 * @param options {Object} - configuration override
	 */
	function SectionDrawing( element, options ) 
	{
		this._init( element, options );
	}

	SectionDrawing.prototype = {

		constructor : SectionDrawing

		, init : function()
		{
			// Shortcuts
			_ref = this;
			_cfg = this.config;
			_sel = this.config.selectors;
			_cls = this.config.classes;
			_evt = fiveleft.Event;

			// Elements
			this.$mainInner = $("#main .main-inner", this.body);
			this.$connectOffset = $("#connect-section");
			this.canvasElement = $( "#canvas-drawing", this.element );

			// Properties
			baseOffset = 0;
			appData = fiveleft.applicationData;

			drawingApi = fiveleft.drawingApi;
			
			scrollArea = this.$mainInner.height() - this.window.height();
			userPos = new fiveleft.Vector();

			// Listeners
			// this.window
			// 	.on( _evt.Start, handleStart )
			// 	.on( _evt.AffixTop, handleAffixTop )
			// 	.on( _evt.IntroSequenceChange, handleIntroChange )
			// 	.on( _evt.IntroSequenceComplete, handleIntroComplete )
			// 	.on( "orientationchange " + _evt.DOMChange, $.proxy(this, 'resize'));

			// Begin Loading Assets
			this.initAssetLoading();
		}


		, initAssetLoading : function()
		{
			loadQueue = new createjs.LoadQueue(true);
			loadQueue.addEventListener( "complete", handleLoadQueueEvent );
			loadQueue.addEventListener( "error", handleLoadQueueEvent );
			loadQueue.addEventListener( "fileload", handleLoadQueueEvent );
			loadQueue.loadManifest([
					{id:"bg-pat", src:"/img/draw-assets/bg-grid-pat.png"}
					,{id:"sprite-patterns", src:"/img/draw-assets/spritesheet-patterns.png"}
					,{id:"sprite-blobs", src:"/img/draw-assets/spritesheet-blobs.png"}
					,{id:"sprite-splatters", src:"/img/draw-assets/spritesheet-splatters.png"}
					// ,{id:"sprite-splatters", src:"img/draw-assets/spritesheet-splatters.jpg"}
				], false);
			loadQueue.load();
		}


		, resize : function( event )
		{
			// log( _cn + "::resize event = ", (event) ? event.type : "none" );
			switch( true )
			{
				case appData.isiOS :
					// var w = window.orientation !== 0 ? window.screen.height : window.screen.width
					// 	,h = window.orientation !== 0 ? window.screen.width : window.screen.height;
					baseOffset = 0;
					// drawingApi.setSize( w, h );
					break;

				default :
					baseOffset = this.$connectOffset.outerHeight();
					// drawingApi.setSize( window.innerWidth, window.innerHeight );
					break;
			}
			scrollArea = (this.$mainInner.height() - this.window.height()) - baseOffset;
			// drawingApi.setSize( window.innerWidth, window.innerHeight );
			// drawingApi.setScrollRatio( clamp( (this.window.scrollTop() / scrollArea), 0, 1) );
		}


		, scroll : function()
		{
			var currOffset = this.element.css("top")
				,offset = (this.affixTop && this.appData.scrollLayout) ? -(this.window.scrollTop()-scrollArea) : 0;

			if( currOffset !== offset && offset < 0 ){
				this.element.css({"top" : offset+"px"} )
			}else{
				this.element.css({"top" : ""});
			}

			// drawingApi.setScrollRatio( clamp( (this.window.scrollTop() / scrollArea), 0, 1) );
		}


		, target : function()
		{

			// log( _cn + "::target" );
		}


		, onMediaQueryChange : function()
		{
			if( !this.appData.scrollLayout ) {
				_ref.element.css({"top" : 0});
			}
		}

	}
	

	function handleStart( event )
	{
		// log( _cn + "::handleStart" );
		// drawingApi.start();
		// _ref.resize();
		// drawingApi.startIntro( $("canvas.hero-canvas") );
	}


	function handleIntroChange( event, index ) 
	{
		// log( _cn + "::handleIntroChange index = ", index );
		//drawingApi.introStep( index );
	}
	

	function handleIntroComplete( event ) 
	{

		// log( _cn + "::handleIntroComplete" );
	}


	function handleAffixTop( event, apply ) 
	{
		_ref.affixTop = apply;
		if( !apply ) {
			_ref.element.css({"top" : 0});
		}else{
			_ref.scroll();
		}
	}


	function handleLoadQueueEvent( event )
	{
		switch( event.type )
		{
			case "complete" : 
				log( _cn + ":: QUEUE COMPLETE " ); 
				drawingApi.setAssetQueue( loadQueue );
				break;
			case "error" : 
				// log( " Error " ); 
				break;
			case "fileload" : 
				// log( " FileLoad ", event.item.tag ); 
				break;
		}
	}



	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	SectionDrawing.extend( fiveleft.SectionAbstract );
	fiveleft.SectionDrawing = SectionDrawing;

}($);

