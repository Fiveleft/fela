
!function($){

	// Namespace
	window.fiveleft = (typeof window.fiveleft == "undefined") ? {} : window.fiveleft;
		
	/* Shortcuts */
	var _cn = "SectionDrawing", _ref, _cfg, _sel, _cls, _evt;

	var baseOffset
		,appData
		,drawingApi
		,affixTop = false
		,affixOffset = 0
		,affixArea = 0
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

			// Properties
			appData = fiveleft.applicationData;
			drawingApi = fiveleft.drawingApi;
			baseOffset = this.$connectOffset.height();

			// Listeners
			this.window.on( _evt.AffixTop, handleAffixTop )

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
			var wH = window.innerHeight;
			this.element.height(wH);
			baseOffset = this.$connectOffset.height();
			affixArea = this.$mainInner.height() - wH - baseOffset;
			affixOffset = _ref.window.scrollTop() - affixArea;
			if( !affixTop && affixOffset > 0 ) handleAffixedScroll();
		}


		, scroll : function()
		{
		}


		, target : function()
		{
		}


		, onMediaQueryChange : function()
		{
			if( !this.appData.scrollLayout ) {
				_ref.element.css({"top" : 0});
			}
		}

	}


	function handleAffixTop( event, apply ) 
	{
		affixTop = apply;
		_ref.window[ (apply) ? "on" : "off" ]( "scroll", handleAffixedScroll );
		if( affixTop ) handleAffixedScroll();
	}


	function handleAffixedScroll()
	{
		affixOffset = _ref.window.scrollTop() - affixArea;
		if( affixOffset > 0 ){
			_ref.element.css({"bottom" : affixOffset+"px"})
		}
	}


	function handleLoadQueueEvent( event )
	{
		switch( event.type )
		{
			case "complete" : 
				// log( _cn + ":: QUEUE COMPLETE " ); 
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

