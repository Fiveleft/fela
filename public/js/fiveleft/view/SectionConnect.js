if( typeof fiveleft == "undefined" ) fiveleft = {};

!function($){
	
	// Shortcuts
	var _cn = "SectionConnect"
		,_ref, _cfg, _sel, _cls, _evt
		,activeScrollStates = [
			"top-inside-viewport", "top-viewport-half", "inside-viewport"
		]
		,activeScrollTest = RegExp("^" + activeScrollStates.join("|^"));



	/** 
	 * SectionConnect Consturctor
	 *  configure, define shortcuts and initialize
	 * @param element {DOM Element} - element acting as root of component
	 */
	function SectionConnect( element ) 
	{
		this._init( element );
	}

	SectionConnect.prototype = {

		constructor : SectionConnect

		, init : function() 
		{
			this.classname = _cn;

			// Shortcuts
			_ref = this;
			_cfg = this.config;
			_sel = this.config.selectors;
			_cls = this.config.classes;
			_evt = fiveleft.Event;

			// Elements
			this.$fixed = $(".section-fix", this.element );
			this.$fixedInner = $(".section-fix-inner", this.element );
			this.minHeight = this.$fixedInner.outerHeight();
			 
			// Properties
			this.affixTop = false;
			this.resize();
		}



		, scroll : function( _scrollState )
		{
			var scrollState = _scrollState||this.element.attr("data-scroll")
				,scrollActive = activeScrollTest.test( scrollState );

			switch( true ) {
				case !this.affixTop && !this.active && scrollActive :
					this.activate();
					this.affixTop = true;
					this.window.trigger( _evt.AffixTop, true );
					break;
				case this.affixTop && !scrollActive && this.active :
					this.deactivate();
					this.affixTop = false;
					this.window.trigger( _evt.AffixTop, false );
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
			this.minHeight = this.$fixedInner.outerHeight();
			this.element.css({"min-height" : this.minHeight+"px"});

			// updateScrollResponse();
			// this.inner.css({"min-height" : "" });
			// this.refreshScrollSpy();
			// log( this.window.scrollTop(), this.top, this.bottom );
			// var padding = Math.round( this.window.height() * 0.75 );
			// this.$sections.not(":last-child").css({"padding-bottom" : padding });
		}
	};


	function handleMediaQueryChange()
	{
		// _ref.resize();
	}


	function handleSiteDataLoaded( )
	{
		_ref.resize();
		// _ref.startScrollSpy();
	}


	// ------------------------------------------------------------------------------------------
	// Class & Namespace Definition
	// ------------------------------------------------------------------------------------------

	// SectionConnect.prototype = new fiveleft.SectionAbstract();
	// SectionConnect.prototype.constructor = SectionConnect;

	SectionConnect.extend( fiveleft.SectionAbstract );
	fiveleft.SectionConnect = SectionConnect;

}($);
