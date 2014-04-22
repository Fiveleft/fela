
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



	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	SectionDrawing.extend( fiveleft.SectionAbstract );
	fiveleft.SectionDrawing = SectionDrawing;

}($);

